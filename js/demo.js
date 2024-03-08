// Alert Banner Demo Buttons Event Listeners
document.getElementById('showSuccessAlert').addEventListener('click', () => {
    showAlertBanner('Success alert demo', 'alert-banner-success');
  });
  
  document.getElementById('showInfoAlert').addEventListener('click', () => {
    showAlertBanner('Info alert demo', 'alert-banner-info');
  });

  document.getElementById('showWarningAlert').addEventListener('click', () => {
    showAlertBanner('Warning alert demo', 'alert-banner-warning');
  });
  
  document.getElementById('showDangerAlert').addEventListener('click', () => {
    showAlertBanner('Danger alert demo', 'alert-banner-danger');
  });
  
  // Theme Switcher Demo Button Event Listener
  document.getElementById('toggleTheme').addEventListener('click', () => {
    themeSwitcher.click();
  });