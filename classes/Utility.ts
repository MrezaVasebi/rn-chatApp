export class Utility {
  validateFields(value: string | undefined): boolean {
    if (value) if (value.trim().length !== 0) return true;
    return false;
  }

  logValue(msg: string, value: any): void {
    console.log(msg, JSON.stringify(value, null, 2));
  }
}
