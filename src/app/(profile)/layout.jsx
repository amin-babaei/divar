import ProfileSidebar from "./ProfileSidebar"

export const metadata = {
  title: 'دیوار من',
}

export default async function LayoutAbout({ children }) {
  return (
    <section className={`container relative min-h-[66vh] mx-auto px-3 font-Ilight`}>
      <ProfileSidebar />
      {children}
    </section>
  );
}
