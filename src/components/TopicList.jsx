import React from "react";

export default function TopicList({ topics, usedIndices, onSelectTopic }) {
  return (
    <section className="cd wide">
      <h2>All topics</h2>
      <div className="tl" id="tl">
        {topics.map((topic, index) => {
          const isUsed = usedIndices.has(index);
          return (
            <button
              key={index}
              className={isUsed ? "u" : ""}
              onClick={() => onSelectTopic(index)}
              title={topic.t}
            >
              {topic.s}
            </button>
          );
        })}
      </div>
      <p>
        <small>
          Topics are compiled from commonly reported campus GD themes for
          2025–26 (technology, economy, workplace, social issues, case and
          abstract). Companies do not publish official topic lists, so treat
          these as likely, not guaranteed.
        </small>
      </p>
    </section>
  );
}
