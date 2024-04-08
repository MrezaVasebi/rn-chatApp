export class Utility {
  logValue(msg: string, value: any): void {
    console.log(msg, JSON.stringify(value, null, 2));
  }

  validateObjectField(fields: object): boolean {
    let isValid = true;

    if (Object.keys(fields).length === 0) isValid = false;
    else {
      for (const key in fields) {
        if (fields[key as keyof typeof fields] === "") isValid = false;

        if (!isValid) break;
      }
    }

    return isValid;
  }
}
