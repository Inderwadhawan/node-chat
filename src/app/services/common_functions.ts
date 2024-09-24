

export const makeUsername = async (email: string): Promise<string> => {
  // Get the part of the email before the "@" symbol
  const emailPrefix = email.split('@')[0];
  // Generate a random 4-digit number
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  // Combine the email prefix with the random digits to create a unique username
  const username = `${emailPrefix}${randomDigits}`;
  return username;
};

// Example of another function
export const anotherFunction = (): string => {
  return 'Hello from another function!';
};