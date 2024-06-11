import Shepherd from "shepherd.js";
import { isBrowser } from "react-device-detect";
import { StepOptions } from "shepherd.js/step";

const tutorial = (): void => {
  if (window.localStorage.getItem("tutorial") === null && isBrowser) {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: "shadow-md bg-purple-dark",
        scrollTo: true,
      },
      useModalOverlay: true,
    });

    const steps: StepOptions[] = [
      {
        text: "Select the foods from the dropdown",
        attachTo: { element: ".foodSelector", on: "bottom" },
        buttons: [{ text: "Next", action: tour.next }],
      },
      {
        text: "Then you will see the total calories and macro nutrients.",
        attachTo: { element: ".macroNutrients", on: "bottom" },
        buttons: [{ text: "Next", action: tour.next }],
      },
      {
        text: "And also all micro nutrients and % of daily recommended values.",
        attachTo: { element: ".microNutrients", on: "left" },
        buttons: [{ text: "Thanks, enjoy!", action: tour.next }],
      },
    ];

    steps.forEach((step) => tour.addStep(step));
    setTimeout(() => {
      tour.start();
    }, 1000);
    window.localStorage.setItem("tutorial", "true");
  }
};

export default tutorial;
