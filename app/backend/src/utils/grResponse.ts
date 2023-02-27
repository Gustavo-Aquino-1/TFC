const grResponse = (status: number, message: unknown) => ({ status, message });
const grResponseErr = (status: number, message: unknown) =>
  grResponse(status, { message });

export { grResponse, grResponseErr };
