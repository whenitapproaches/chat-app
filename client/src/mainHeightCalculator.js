export default function mainHeightCalculator(navbar) {
  const navbarHeight = navbar.value.clientHeight
  return `calc(100vh - ${navbarHeight}px)`
}