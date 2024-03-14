export class Utility {
  validateFields(value: string) {
    if (value.trim().length === 0) return false;
    return true;
  }

  logValue(msg: string, value: any) {
    console.log(msg, JSON.stringify(value, null, 2));
  }
}
