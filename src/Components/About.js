import React, { Component } from "react";
import Fade from "react-reveal";

class About extends Component {
  render() {

    const bio = "Zero-shot learning (ZSL) is a technique that allows the identification of objects \
      which instances have not been seen during training. By describing the unseen classes using examples \
      the model is familiar with we can leverage the understanding to produce accurate predictions of \
      objects the model has never seen. This technique arose in 2008 under the paradigm dataless \
      classification, but more recently, the availability of meta-information has increased significantly, \
      giving rise to a new wave of zero-shot enthusiasm.  Multi-label zero-shot learning (MLZSL) is a \
      facet of zero-shot learning in which an image is labelled with multiple labels instead of just one. \
      Most images typically do not just contain one object so this technique lends itself to a wider range \
      of applications than traditional ZSL. The discipline can be split into two different groups, with some \
      opting to design their models using embedding, and other using generative models.";

    const embedding = "Embedding-based methods work by finding a connection between images and their visual descriptors \
    We can represent the visual descriptor as word vector of high dimension and then find a way to map the image into \
    the same high dimension format. By doing so, the model is learning to associate visual descriptors with actual visual features.\
    We can extend this effect by adding visual descriptors for visual features the model has never seen. By leveraging the learnt knowledge \
    we can begin to predict what certain visual features are based on just their visual descriptors and perform a nearest neighbour search \
    to find which class an input belongs to ."

    const generative = "Generative methods work in a slightly different way to embedding models but accomplish a similar task. \
    A generative model must first learn what seen labels look like, and this is done through traditional learning mechanisms \
    by showing example images for each class. However after this step, the generative models then generate an example image of what they think \
    unseen labels will actually look like. After this step, the model is able to classify images using traditional unsupervised \
    learning as now it has examples for unseen classes."

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="nine columns main-col">
              <h2>What is Multi-Label Zero-Shot Learning?</h2>
              <p>{bio}</p>
              <h2>Embedding Model</h2>
              <p>{embedding}</p>
              <img src="images/embedding.png"></img>
              <h2>Generative Model</h2>
              <p>{generative}</p>
              <img src="images/generative.png"></img>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;
