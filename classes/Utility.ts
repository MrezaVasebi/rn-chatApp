export class Utility {
  validateFields(value: string | undefined): boolean {
    if (value) if (value.trim().length !== 0) return true;
    return false;
  }

  logValue(msg: string, value: any): void {
    console.log(msg, JSON.stringify(value, null, 2));
  }

  validateObjectField(fields: object): boolean {
    let isValid = true;

    if (Object.keys(fields).length === 0) isValid = false;
    else {
      for (const key in fields) {
        if (this.validateFields(fields[key as keyof typeof fields]))
          isValid = false;

        if (!isValid) break;
      }
    }

    return isValid;
  }
}
