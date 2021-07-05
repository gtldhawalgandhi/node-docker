resource "null_resource" "remoteExecProvisioning" {

  connection {
    host        = azurerm_public_ip.public_ip.ip_address
    user        = var.vm_user
    type        = "ssh"
    private_key = file(var.private_ssh_key)
    timeout     = "1m"
  }

  provisioner "remote-exec" {
    inline = [
      "sleep 4s", # Give some buffer time for our VM to be ready
      "mkdir -p ~/docker-node/scripts",
      "mkdir -p ~/docker-node/tasks",
      "docker volume create portainer_data || true",
      "docker run -d -p 9000:9000 -p 8000:8000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce || true",
    ]
  }

  provisioner "file" {
    source      = "../../tasks"
    destination = "/home/${var.vm_user}/docker-node"
  }

  provisioner "file" {
    source      = "../../scripts"
    destination = "/home/${var.vm_user}/docker-node"
  }

  provisioner "file" {
    source      = "../../prod.env"
    destination = "/home/${var.vm_user}/docker-node/prod.env"
  }

  provisioner "file" {
    source      = "../../docker-compose.prod.yml"
    destination = "/home/${var.vm_user}/docker-node/docker-compose.prod.yml"
  }

  provisioner "file" {
    source      = "../../Dockerfile"
    destination = "/home/${var.vm_user}/docker-node/Dockerfile"
  }

  provisioner "remote-exec" {
    inline = [
      "sleep 1m",
      "cd docker-node; task -t tasks/Taskfile.prod.yml STAGE=prod common:compose-up",
    ]
  }
}