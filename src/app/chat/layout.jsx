import dynamic from 'next/dynamic';

const ChatContainer = dynamic(() => import('./ChatContainer'), {
  ssr: true 
});

export const metadata = {
  title: 'چت های من',
}

export default async function LayoutAbout({ children }) {
  return (
    <ChatContainer child={children}/>
  );
}
