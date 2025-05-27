// Previous content remains the same, just update the handleSubmit function:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validation
  if (!formData.name || !formData.description || !formData.inviteLink) {
    setFormError(t('submit.form.errorRequiredFields'));
    return;
  }
  
  if (!formData.inviteLink.includes('discord.gg')) {
    setFormError(t('submit.form.errorInvalidInvite'));
    return;
  }
  
  setFormState('submitting');
  setFormError(null);
  
  try {
    const result = await apiMock.submitServer(formData);
    
    if (result.success && result.serverId) {
      setFormState('success');
      
      // Redirect to the new server's page
      setTimeout(() => {
        navigate(`/servers/${result.serverId}`);
      }, 2000);
    } else {
      throw new Error(result.error || t('submit.form.errorGeneric'));
    }
  } catch (error) {
    setFormState('error');
    setFormError(error instanceof Error ? error.message : t('submit.form.errorGeneric'));
  }
};