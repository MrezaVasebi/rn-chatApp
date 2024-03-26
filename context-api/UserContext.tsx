import { createContext, useState } from "react";

type UserType = {
  user: object | null;
  handleSetUser: (value: any) => void;
};

export const UserContext = createContext<UserType>({
  user: null,
  handleSetUser(value) {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);

  const handleSetUser = (value: any) => {
    setUser(value);
  };

  return (
    <UserContext.Provider value={{ user, handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};
