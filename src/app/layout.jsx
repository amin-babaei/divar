import iranFont from '@/constants/localFont'
import Providers from './Provider'
import './globals.css'
import { Slide, ToastContainer } from 'react-toastify'
import Navbar from '@/components/navbar/Navbar'

export const metadata = {
  title: 'دیوار',
  description: 'در دیوار مشهد هم رایگان آگهی ثبت کنید و هم میلیون‌ها آگهی و نیازمندی را در شهر مشهد مشاهده کنید',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <body className={`${iranFont.variable} font-sans`}>
        <Providers>
          <ToastContainer rtl limit={1} theme="colored" transition={Slide}/>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
