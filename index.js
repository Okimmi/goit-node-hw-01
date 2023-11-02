import { Command } from "commander";
import * as contactsService from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(await contactsService.listContacts());
      break;

    case "get":
      console.log(await contactsService.getContactById(id));
      break;

    case "add":
      console.log(await contactsService.addContact(name, email, phone));
      break;

    case "remove":
      console.log(await contactsService.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
