resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_app_service_plan" "plan" {
  name                = var.app_service_plan_name
  location            = var.location
  resource_group_name = var.resource_group_name
  kind                = "Linux"
  reserved            = true # Required for Linux

  sku {
    tier = "Basic"       # Options: Free, Basic, Standard, Premium, etc.
    size = "B1"          # B1 is a low-cost Linux-compatible SKU
  }
}

resource "azurerm_app_service" "backend" {
  name                = "ecommerce-backend-app"
  location            = var.location
  resource_group_name = var.resource_group_name
  app_service_plan_id = azurerm_app_service_plan.plan.id

  site_config {
    linux_fx_version = "DOCKER|${var.acr_name}.azurecr.io/ecommerce-backend:latest"
  }

  app_settings = {
    WEBSITES_PORT = "3000"
    DOCKER_REGISTRY_SERVER_URL      = "https://${var.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = var.acr_username
    DOCKER_REGISTRY_SERVER_PASSWORD = var.acr_password
    NODE_ENV = "production"
  }
}