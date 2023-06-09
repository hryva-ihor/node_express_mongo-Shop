const fs = require("fs");
const path = require("path");
const cardPath = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(course) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex((c) => c.id === course.id);
    const candidate = card.courses[idx];

    if (candidate) {
      //course has already been added
      candidate.count++;
      card.courses[idx] = candidate;
    } else {
      //need to add course to the card
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(cardPath, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(cardPath, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex((c) => c.id === id);
    const course = card.courses[idx];

    if (course.count === 1) {
      //delet course is count === 1
      card.courses = card.courses.filter((c) => c.id !== id);
    } else {
      //change count if count > 1
      card.courses[idx].count--;
    }

    card.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(cardPath, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }
}

module.exports = Card;
