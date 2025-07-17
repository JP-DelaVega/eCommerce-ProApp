terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.24.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "backend" {
  name = "ecommerce-backend"
  build {
    path    = "../backend"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "backend" {
  name  = "ecommerce-backend"
  image = docker_image.backend.latest

  ports {
    internal = 3000
    external = 3000
  }

  env = [
    "NODE_ENV=production"
  ]
}

resource "docker_image" "frontend" {
  name = "ecommerce-frontend"
  build {
    path    = "../frontend"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "frontend" {
  name  = "ecommerce-frontend"
  image = docker_image.frontend.latest

  ports {
    internal = 5173
    external = 5173
  }
}