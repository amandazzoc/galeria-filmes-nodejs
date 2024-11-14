import filme from "../models/Filme.js";
import mongoose from "mongoose";

const Filme = mongoose.model("Filme", filme);

class FilmeService {
  Create(file) {
    const newPicture = new Filme({
      file: file,
    });
    newPicture.save();
  }

  GetAll() {
    const filme = Filme.find();
    return filme;
  }
}

export default new FilmeService();
