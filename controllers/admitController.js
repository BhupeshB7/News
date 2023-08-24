const Admit = require('../models/Admit');
const NodeCache = require('node-cache');
const cache = new NodeCache();

// API endpoint for creating admits
// exports.createAdmit =  async (req, res) => {
//   try {
//     const { name, content, title, description } = req.body;
//     const { image } = req.files;

//     if (!image) {
//       return res.status(400).json({ error: 'Image file is required' });
//     }

//     if (image.size > 1024 * 1024) {
//       return res.status(400).json({ error: 'Image file size should be less than 1MB' });
//     }

//     const newAdmit = new Admit({
//       name,
//       // titlesAndDescriptions: [{ title, description }],
//       title,
//       description,
//       content,
//       imageUrl: `/uploads/${image.name}`,
//     });

//     image.mv(`public/uploads/${image.name}`, async (err) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to upload image' });
//       }

//       try {
//         await newAdmit.save();
//         res.status(201).json({ message: 'Admit created successfully', admit: newAdmit });
//       } catch (error) {
//         res.status(500).json({ error: 'An error occurred while saving the admit' });
//         console.log(error);
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the admit' });
//     console.log(error);
//   }
// }
// admitController.js


// Controller function for image upload
exports.createAdmit = async (req, res) => {
  try {
    const { name, content, title, description } = req.body;
    const { image } = req.files;

    if (!image) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    if (image.size > 1024 * 1024) {
      return res.status(400).json({ error: 'Image file size should be less than 1MB' });
    }

    const newAdmit = new Admit({
      name,
      title,
      description,
      content,
      imageUrl: `/uploads/${image.name}`,
    });

    try {
      await newAdmit.save();
      image.mv(`public/uploads/${image.name}`, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to upload image' });
        }
        res.status(201).json({ message: 'Admit created successfully', admit: newAdmit });
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving the admit' });
      console.log(error);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the admit' });
    console.log(error);
  }
};


// const Admit = require("../models/Admit");

// exports.createAdmit = async (req, res) => {
//   try {
//     const { name, titlesAndDescriptions, content } = req.body;
//     const { image } = req.files;

//     if (!image) {
//       return res.status(400).json({ error: "Image file is required" });
//     }

//     if (image.size > 1024 * 1024) {
//       return res.status(400).json({ error: "Image file size should be less than 1MB" });
//     }

//     const newAdmit = new Admit({
//       name,
//       titlesAndDescriptions,
//       content,
//       imageUrl: `/uploads/${image.name}`,
//     });

//     image.mv(`public/uploads/${image.name}`, async (err) => {
//       if (err) {
//         return res.status(500).json({ error: "Failed to upload image" });
//       }

//       try {
//         await newAdmit.save();
//         res.status(201).json({ message: "Admit created successfully", admit: newAdmit });
//       } catch (error) {
//         res.status(500).json({ error: "An error occurred while saving the admit" });
//         console.log(error);
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while creating the admit" });
//     console.log(error);
//   }
// };
// const Admit = require("../models/Admit");




exports.updateAdmit = async (req, res) => {
  try {
    const admitId = req.params.id;
    const { title, description } = req.body;
    const { content } = req.body;
    const { imageUrl } = req.files;

    const admit = await Admit.findById(admitId);

    if (!admit) {
      return res.status(404).json({ error: 'Admit not found' });
    }

    admit.titlesAndDescriptions.push({ title, description });
    admit.content = content;
    admit.imageUrl = imageUrl.name;

    await admit.save();
    res.json({ message: 'Admit updated successfully', admit });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the admit' });
  }
};

//  exports.getAdmit = async (req, res) => {
//   try {
//     const admits = await Admit.find();
//     res.json(admits);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };
exports.getAdmit = async (req, res) => {
  try {
    // Check if data is already in cache
    const cachedData = cache.get('admitData');
    
    if (cachedData) {
      // console.log('Using cached data');
      return res.json(cachedData);
    }

    // Fetch data from the database if not in cache
    const admits = await Admit.find();
    cache.set('admitData', admits);

    res.json(admits);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSpecificAdmitCard = async (req, res) => {
  try {
    
    const admit = await Admit.findById(req.params.id);
    res.json(admit);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}