import './style.css'
// import typescriptLogo from './typescript.svg'
import { show } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="content" class="bg-red-500 text-white"></div>
    <div class="card">
      <button id="counter" type="button" class="bg-blue-500 text-white py-1 px-2">Show</button>
    </div>
  </div>
`

show(
  document.querySelector<HTMLButtonElement>('#counter')!,
  document.querySelector<HTMLDivElement>('#content')!
)
