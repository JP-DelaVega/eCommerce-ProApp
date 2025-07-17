output "frontend_app_url" {
  value = "https://${azurerm_app_service.frontend.default_site_hostname}"
}

output "backend_app_url" {
  value = "https://${azurerm_app_service.backend.default_site_hostname}"
}