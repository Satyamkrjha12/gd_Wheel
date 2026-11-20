import React from "react";

export default function GdStructure() {
  return (
    <section className="cd wide">
      <h2>GD key structure</h2>
      <div className="st">
        <div>
          <h3>Opening · first 30 sec</h3>
          <p>Define the topic, give context, state your stand.</p>
        </div>
        <div>
          <h3>Body · main discussion</h3>
          <p>Point + fact + example. Then pass the ball to another speaker.</p>
        </div>
        <div>
          <h3>Close · last minutes</h3>
          <p>Summarise the group’s views. Do not just repeat yours.</p>
        </div>
        <div>
          <h3>SPEAK</h3>
          <p>
            Start with a stand · Point with proof · Everyone included · Add,
            don’t repeat · Keep it crisp and calm.
          </p>
        </div>
      </div>

      <div className="dd">
        <div className="ok">
          <h3>Do</h3>
          <ul>
            <li>Enter early with a clear stand</li>
            <li>Use one fact or example per point</li>
            <li>Invite the quiet member in</li>
            <li>Disagree with the idea, politely</li>
            <li>Offer to summarise at the end</li>
          </ul>
        </div>
        <div className="no">
          <h3>Don’t</h3>
          <ul>
            <li>Interrupt or raise your voice</li>
            <li>Stay silent for the whole GD</li>
            <li>Drift away from the topic</li>
            <li>Memorise and recite a monologue</li>
            <li>Make personal remarks</li>
          </ul>
        </div>
      </div>

      <p>
        <small>
          Class tip: one group discusses (fishbowl) while the rest score them on
          content, communication, listening, leadership and composure.
        </small>
      </p>
    </section>
  );
}
