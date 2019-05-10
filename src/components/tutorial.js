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
    tour.addStep('foods', {
      text: 'Select the foods from the dropdown',
      attachTo: '.foodSelector bottom',
      classes: 'foodSelector',
      buttons: [{ text: 'Next', action: tour.next }],
    })
    tour.addStep('macro', {
      text: 'Then you will see the total calories and macro nutrients.',
      attachTo: '.macroNutrients bottom',
      classes: 'macroNutrients',
      buttons: [{ text: 'Next', action: tour.next }],
    })
    tour.addStep('micro', {
      text: 'And also all micro nutrients and % of daily recommended values.',
      attachTo: '.microNutrients left',
      classes: 'microNutrients',
      buttons: [{ text: 'Thanks, enjoy!', action: tour.next }],
    })
    setTimeout(() => {
      tour.start()
    }, 1000)
    window.localStorage.setItem('tutorial', true)
  }
}
