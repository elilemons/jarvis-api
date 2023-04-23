export function generatePrompt(animal, promptType) {
  switch (promptType) {
    case "animalName":
      const capitalizedAnimal =
      animal[0].toUpperCase() + animal.slice(1).toLowerCase();
      return `Suggest three names for an animal that is a superhero.
        Animal: Cat
        Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
        Animal: Dog
        Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
        Animal: ${capitalizedAnimal}
        Names:`;
    case "animalSays":
      return `The ${animal} says `;
    default:
      break;
  }
}