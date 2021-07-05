data "template_file" "cloudinit" {
  template = file("../vm-cloud-init.yml")
  vars = {
    vm_user        = var.vm_user
    public_ssh_key = file(var.public_ssh_key)
  }
}