import { createTheme, Pagination, ThemeProvider } from "flowbite-react"
import { toPersianDigits } from "@/utils/persianDigit";

const customTheme = createTheme(
  {
    pagination: {
      pages: {
        previous: {
          base: "rounded-l-sm p-3 dark:bg-white dark:text-black enabled:dark:hover:bg-gray-100 enabled:dark:hover:text-gray-700 enabled:border-gray-300",
          icon: "h-5 w-5"
        },
        next: {
          base: "rounded-r-sm p-3 dark:bg-white dark:text-black enabled:dark:hover:bg-gray-100 enabled:dark:hover:text-gray-700 enabled:border-gray-300",
          icon: "h-5 w-5"
        },
        selector: {
          base: " dark:bg-white enabled:border-gray-300 p-3 dark:text-black enabled:dark:hover:bg-gray-200 enabled:dark:hover:text-gray-800",
          active: "dark:enabled:hover:bg-red-500 dark:enabled:hover:text-white enabled:dark:border-red-900 dark:bg-red-600 dark:text-white",
          disabled: "cursor-not-allowed opacity-50"
        }
      }
    }
  }
);

const PaginationUI = ({ currentPage, onPageChange, totalPages }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <div className='flex justify-center mb-5 mt-15 sm:justify-end lg:justify-center lg:fixed lg:left-1/3 lg:right-1/3 lg:bottom-0 xl:bottom-1/4'>
        <Pagination
          dir='ltr'
          currentPage={currentPage}
          layout="pagination"
          defaultValue={currentPage}
          onPageChange={onPageChange}
          showIcons={true}
          totalPages={totalPages}
          previousLabel="قبلی"
          nextLabel="بعدی"
          renderPaginationButton={(props) => {
            return <button className={props.className} onClick={props.onClick}>{toPersianDigits(props.children)}</button>
          }}
        />
      </div>
    </ThemeProvider>
  )
}

export default PaginationUI