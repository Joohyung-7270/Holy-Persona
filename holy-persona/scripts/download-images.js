const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');

// Character image mapping with direct image URLs
const characterImages = {
  '다윗': 'https://images.unsplash.com/photo-1621619856624-42fd193a0661',      // Harp
  '베드로': 'https://images.unsplash.com/photo-1517627043994-b991abb62fc8',    // Fisherman
  '모세': 'https://images.unsplash.com/photo-1512658740823-0ebb97b3b86e',      // Desert mountain
  '엘리야': 'https://images.unsplash.com/photo-1519681393784-d120267933ba',    // Mountain sunset
  '에스더': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',    // Queen crown
  '마리아': 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f',    // Mother and child
  '솔로몬': 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce',    // Throne
  '바울': 'https://images.unsplash.com/photo-1508672019048-805c876b67e2',      // Ancient road
  '요나': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',      // Stormy sea
  '한나': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',         // Praying
  '느헤미야': 'https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a',  // Ancient wall
  '요셉': 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368',      // Egypt
  '라합': 'https://images.unsplash.com/photo-1548013146-72479768bada',         // Ancient city
  '룻': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',        // Wheat field
  '아브라함': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',   // Night sky
  '디모데': 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14'     // Ancient scroll
};

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download and process image
async function processImage(character, imageUrl) {
  const filename = `${character.toLowerCase()}.jpg`;
  const outputPath = path.join(imagesDir, filename);

  try {
    // Download image
    const response = await axios.get(`${imageUrl}?w=800&h=600&fit=crop`, {
      responseType: 'arraybuffer'
    });

    // Process image with Sharp
    await sharp(response.data)
      .resize(800, 600, {
        fit: 'cover',
        position: 'center'
      })
      .composite([{
        input: Buffer.from(`
          <svg width="800" height="600">
            <text x="400" y="550" 
                  font-family="Arial" 
                  font-size="48" 
                  font-weight="bold"
                  fill="rgba(255,255,255,0.7)"
                  text-anchor="middle">
              HolyPersona
            </text>
          </svg>
        `),
        gravity: 'south'
      }])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`Successfully processed image for ${character}`);
  } catch (error) {
    console.error(`Error processing ${character}:`, error.message);
  }
}

// Process all images with delay between requests
async function processAllImages() {
  for (const [character, imageUrl] of Object.entries(characterImages)) {
    console.log(`Processing ${character}...`);
    await processImage(character, imageUrl);
    // Add delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Run the script
processAllImages().catch(console.error); 