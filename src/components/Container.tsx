import type { FC } from 'react';
import Header from './Header';
import type React from 'react';

type ContainerProps = {
  children: React.ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 max-w-3xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default Container;
