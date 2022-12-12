export const getSuccessResponse = (
  message: string,
  data: Record<string, any>
): Record<string, any> => {
  return {
    status: true,
    message,
    data
  };
};

export const getFailuerResponse = (message: string): Record<string, any> => {
  return {
    status: false,
    message
  };
};
