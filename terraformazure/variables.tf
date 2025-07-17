variable "location" {
  default = "East US"
}

variable "resource_group_name" {
  default = "ecommerce-rg"
}

variable "app_service_plan_name" {
  default = "ecommerce-plan"
}

variable "acr_name" {
  description = "Name of the Azure Container Registry"
  type        = string
}

variable "acr_username" {
  description = "ACR username"
  type        = string
  sensitive   = true
}

variable "acr_password" {
  description = "ACR password"
  type        = string
  sensitive   = true
}