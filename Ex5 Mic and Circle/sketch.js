let mic;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // Start the Audio Input.
  mic.start();
}

function draw() {
  background(200);

  // Get the overall volume from the mic (between 0 and 1.0)
  let vol = mic.getLevel();

  // Define the colors for low and high volume
  let green = color(0, 255, 0);
  let red = color(255, 0, 0);

  // Use the volume level to interpolate between green and red
  let col = lerpColor(green, red, vol);

  // Set the fill to the interpolated color
  fill(col);
  stroke(0);

  // Map the mic volume to the circle's vertical position to make it jump from the bottom
  let yPos = map(vol, 0, 1, height, 0);

  // Use the mic volume to change the circle's size
  let radius = map(vol, 0, 1, 10, 200); // Adjust min and max circle size as needed

  // Draw the ellipse with dynamic position, size, and color based on the mic's volume
  ellipse(width / 2, yPos-25, radius, radius);
}
