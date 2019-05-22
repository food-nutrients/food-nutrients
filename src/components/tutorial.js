import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd-theme-default.css'
import { isBrowser } from 'react-device-detect'
export default () => {
  if (window.localStorage.getItem('tutorial') === null && isBrowser) {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'shadow-md bg-purple-dark',
        scrollTo: true,
      },
      useModalOverlay: true,
    })
    const steps = [
      {
        name: 'foods',
        text: 'Select the foods from the dropdown',
        attachTo: '.foodSelector bottom',
        buttons: [{ text: 'Next', action: tour.next }],
      },
      {
        name: 'macro',
        text: 'Then you will see the total calories and macro nutrients.',
        attachTo: '.macroNutrients bottom',
        buttons: [{ text: 'Next', action: tour.next }],
      },
      {
        name: 'micro',
        text: 'And also all micro nutrients and % of daily recommended values.',
        attachTo: '.microNutrients left',
        buttons: [{ text: 'Thanks, enjoy!', action: tour.next }],
      },
    ]
    steps.forEach(step => tour.addStep(step.name, step))
    setTimeout(() => {
      tour.start()
    }, 1000)
    window.localStorage.setItem('tutorial', true)
  }
}
