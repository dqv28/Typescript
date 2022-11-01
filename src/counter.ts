export function show(element: HTMLButtonElement, contentE: HTMLDivElement) {
  element.addEventListener('click', () => {
    return contentE.innerHTML = "Hello World"
  })
}
