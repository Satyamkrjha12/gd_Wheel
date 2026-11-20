import React from "react";
import { POINTER_LABELS } from "../data/topics";

export default function TopicCard({ topic }) {
  return (
    <section className="cd">
      <h2>2. Your topic</h2>
      <div id="tp">
        {topic ? (
          <>
            <span className="ch">{topic.c}</span>
            <p id="tt">{topic.t}</p>
            {topic.p.map((point, index) => (
              <p className="pn" key={index}>
                <b>{POINTER_LABELS[index] || `Point ${index + 1}`}</b>
                {point}
              </p>
            ))}
          </>
        ) : (
          <>
            <span className="ch">Waiting</span>
            <p id="tt">Spin the wheel or pick a topic from the list below.</p>
          </>
        )}
      </div>
    </section>
  );
}
