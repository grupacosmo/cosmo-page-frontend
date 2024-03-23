export const scrollTop = (scrollBehavior: ScrollBehavior = 'auto') => {
    window.scrollTo({
        top: 0,
        behavior: scrollBehavior
    })
}