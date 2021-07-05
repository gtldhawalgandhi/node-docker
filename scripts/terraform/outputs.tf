output "vm_id" {
  value = azurerm_linux_virtual_machine.linuxvm.id
}

output "vm_ip" {
  value = azurerm_linux_virtual_machine.linuxvm.public_ip_address
}

output "vm_user" {
  value = var.vm_user
}

output "private_ssh_key" {
  value = var.private_ssh_key
}