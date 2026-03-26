

(function () {
  var screens = Array.prototype.slice.call(document.querySelectorAll(".screen"));
  var current = 0;


var progressWrap = document.getElementById("progressWrap");
var progressFill = document.getElementById("progressFill");
var progressText = document.getElementById("progressText");
	
	
	
  function getScreenIndexById(id) {
    for (var i = 0; i < screens.length; i++) {
      if (screens[i].id === id) return i;
    }
    return 0;
  }

	
	
	
function updateProgress() {
  var count = 0;

  if (document.querySelector('input[name="mood"]:checked')) count++;
  if (document.querySelector('input[name="atm"]:checked')) count++;
  if (document.querySelector('input[name="sound"]:checked')) count++;

  var percent = 0;
  if (count === 1) percent = 33;
  if (count === 2) percent = 67;
  if (count === 3) percent = 100;

  var activeScreen = screens[current] ? screens[current].id : "";

  if (progressWrap) {
    if (activeScreen === "screen-intro") {
      progressWrap.classList.remove("is-visible");
      progressWrap.setAttribute("aria-hidden", "true");
    } else {
      progressWrap.classList.add("is-visible");
      progressWrap.setAttribute("aria-hidden", "false");
    }
  }

  if (progressFill) {
    progressFill.style.width = percent + "%";
  }

  if (progressText) {
    progressText.textContent = percent + "%";
  }
}
	
	
	///
  function showScreen(index) {
    if (index < 0) index = 0;
    if (index >= screens.length) index = screens.length - 1;

    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove("is-active");
    }
    screens[index].classList.add("is-active");
    current = index;
	updateProgress();
	  
    if (screens[index].id === "screen-result") {
      updateResult();
    }

    var h = screens[index].querySelector("h1, h2");
    if (h) {
      h.setAttribute("tabindex", "-1");
      h.focus();
    }
  }

	
	
	
	
////////
	

	
	
	
// =============================
// Full card database
// =============================
var emotionalCards = {
  tired: {
    quiet: {
      rnb: {
        title: "Soft Recharge",
        snapshot: "You may need softness more than pressure right now.",
        prompt: "Resting is not the same as giving up. Settle your body first, then choose one tiny next step.",
        tryThis: "Place both feet on the floor and take 5 slow breaths, letting each exhale get a little longer.",
        guidance: "Self-compassion + physiological calming"
      },
      classical: {
        title: "Low Battery, Clear Mind",
        snapshot: "Your energy is limited, but your mind may still want a little order.",
        prompt: "Do not force full productivity. Just make the next move easier.",
        tryThis: "Look away from the screen for 20 seconds and relax your jaw before continuing.",
        guidance: "Attention recovery + reducing cognitive load"
      },
      rock: {
        title: "Running on Fumes",
        snapshot: "You may still want momentum, even with low energy.",
        prompt: "Borrow a little drive, but do not turn it into self-pressure.",
        tryThis: "Stretch your shoulders for 15 seconds, then do only one 2-minute task.",
        guidance: "Pacing + micro-activation"
      },
      white: {
        title: "Less Input, More Space",
        snapshot: "Your system may be asking for less stimulation.",
        prompt: "You may not need more intensity. You may just need fewer signals competing for attention.",
        tryThis: "Mute extra tabs and take a 1-minute screen pause.",
        guidance: "Stimulus control + simplifying the environment"
      }
    },
    focus: {
      rnb: {
        title: "Gentle Focus",
        snapshot: "You seem tired, but still willing to keep going.",
        prompt: "Do not chase motivation. Shrink the task until it feels possible to begin.",
        tryThis: "Set a 5-minute timer and work only on the easiest first step.",
        guidance: "Behavioral activation + lowering the start barrier"
      },
      classical: {
        title: "One Clear Step",
        snapshot: "Your attention may work best if the path feels simple and structured.",
        prompt: "Clarity saves energy. Choose one action, not the whole assignment.",
        tryThis: "Write the next task as one verb: open, draft, send, review.",
        guidance: "Executive support + offloading thinking"
      },
      rock: {
        title: "Short Burst Mode",
        snapshot: "You may have just enough energy for a brief push.",
        prompt: "Use intensity in a small container, then stop before burnout gets louder.",
        tryThis: "Do a 90-second work sprint, then pause and check in again.",
        guidance: "Time boxing + burnout prevention"
      },
      white: {
        title: "Protected Attention",
        snapshot: "Your energy is limited, so your attention needs protection.",
        prompt: "Treat focus like a small battery and guard it from unnecessary drain.",
        tryThis: "Close 3 distractions and keep just one tab open for 5 minutes.",
        guidance: "Attentional control + distraction reduction"
      }
    },
    relax: {
      rnb: {
        title: "Permission to Slow Down",
        snapshot: "You may not need fixing right now, just a softer pace.",
        prompt: "Recovery counts as productive when your system is overloaded.",
        tryThis: "Put a hand on your chest and let your shoulders drop as you exhale slowly.",
        guidance: "Self-soothing + body relaxation"
      },
      classical: {
        title: "Quiet Recovery",
        snapshot: "Your body seems ready for a calmer rhythm.",
        prompt: "Let this be a transition back to steadier energy, not a demand for more output.",
        tryThis: "Dim your screen and lower the room brightness for 2 minutes.",
        guidance: "Recovery cueing + sleep-hygiene awareness"
      },
      rock: {
        title: "Release Before Rest",
        snapshot: "Some tiredness carries hidden tension.",
        prompt: "Let the body release a bit before asking it to fully settle.",
        tryThis: "Shake out your arms and loosen your neck for 20 seconds.",
        guidance: "Somatic release"
      },
      white: {
        title: "Deep Decompression",
        snapshot: "You may be ready for less effort and more nervous-system quiet.",
        prompt: "Not every low-energy moment needs a solution. Some need stillness.",
        tryThis: "Sit back and do nothing for one full minute except notice one steady sound.",
        guidance: "Grounding + parasympathetic settling"
      }
    }
  },

  anxious: {
    quiet: {
      rnb: {
        title: "You Do Not Have to Solve It All Now",
        snapshot: "Your mind may be moving faster than this moment requires.",
        prompt: "Safety can begin with slowing down, not by figuring everything out immediately.",
        tryThis: "Use 5-4-3-2-1 grounding: 5 things you see, 4 feel, 3 hear, 2 smell, 1 taste.",
        guidance: "Grounding for anxious over-arousal"
      },
      classical: {
        title: "Breathe in Structure",
        snapshot: "Anxiety often wants certainty all at once.",
        prompt: "You do not need certainty yet. You just need one calmer breath after another.",
        tryThis: "Inhale for 4, exhale for 6, and repeat 5 times.",
        guidance: "Paced breathing"
      },
      rock: {
        title: "Hold the Ground",
        snapshot: "Your body may be carrying anxious energy, not just your thoughts.",
        prompt: "Ground the body first before arguing with the mind.",
        tryThis: "Press both feet into the floor for 10 seconds, then release. Repeat 3 times.",
        guidance: "Somatic grounding"
      },
      white: {
        title: "Narrow the Signal",
        snapshot: "Too much input can make anxious thoughts feel louder.",
        prompt: "Reduce the noise around you before asking your mind to settle.",
        tryThis: "Listen to one steady sound for 60 seconds and let the rest stay in the background.",
        guidance: "Sensory anchoring"
      }
    },
    focus: {
      rnb: {
        title: "One Thing Is Enough",
        snapshot: "Anxiety can make everything feel urgent at once.",
        prompt: "Do not sort out your whole life right now. Pick one manageable priority.",
        tryThis: "Write down the one next step that would make today 5% easier.",
        guidance: "Task narrowing + manageable prioritization"
      },
      classical: {
        title: "Sort, Then Start",
        snapshot: "Your thoughts may need structure more than reassurance right now.",
        prompt: "Separate what you can act on from what you can only worry about.",
        tryThis: "Make two columns: 'I can do now' and 'Not for this moment.'",
        guidance: "Cognitive sorting + defusion"
      },
      rock: {
        title: "Turn Alarm into Motion",
        snapshot: "Anxious energy can sometimes be redirected into action.",
        prompt: "Use the energy without letting it choose the pace.",
        tryThis: "Start one task for just 3 minutes, then reassess.",
        guidance: "Behavioral activation for anxiety"
      },
      white: {
        title: "One Tab, One Task",
        snapshot: "Your attention may feel scattered because your system is overloaded.",
        prompt: "Calm does not always come first. Sometimes clarity comes first.",
        tryThis: "Keep one tab open, set one timer, and do one task until it ends.",
        guidance: "Attentional containment"
      }
    },
    relax: {
      rnb: {
        title: "Gentle First",
        snapshot: "You may not need pressure. You may need reassurance.",
        prompt: "Talk to yourself the way you would speak to a stressed friend.",
        tryThis: "Put a hand on your chest and say: 'This is hard, and I can take it one step at a time.'",
        guidance: "Self-compassion"
      },
      classical: {
        title: "Loosen the Body, Loosen the Mind",
        snapshot: "Anxiety often lives in the jaw, shoulders, and breath.",
        prompt: "Let your body show your brain that this moment is survivable.",
        tryThis: "Unclench your jaw, relax your tongue, and make one long exhale.",
        guidance: "Muscle release + breath regulation"
      },
      rock: {
        title: "Move the Tension Through",
        snapshot: "Some anxiety settles better after a small release of physical energy.",
        prompt: "You do not have to sit perfectly still in order to calm down.",
        tryThis: "Pace or stretch for 30 seconds, then sit again and check in.",
        guidance: "Physical discharge + re-regulation"
      },
      white: {
        title: "Let the Edges Soften",
        snapshot: "Your system may be looking for a softer sensory boundary.",
        prompt: "You are allowed to make this moment smaller and gentler.",
        tryThis: "Breathe with one steady background sound for 1 minute.",
        guidance: "Sensory soothing"
      }
    }
  },

  calm: {
    quiet: {
      rnb: {
        title: "Protect the Softness",
        snapshot: "You seem relatively steady right now.",
        prompt: "Do not rush past this state. Notice what is helping.",
        tryThis: "Name 3 things that are making this moment feel manageable.",
        guidance: "Resource noticing"
      },
      classical: {
        title: "Clear and Steady",
        snapshot: "Calm can create room for thoughtful choices.",
        prompt: "Use this clarity gently. One intentional action is enough.",
        tryThis: "Choose the next meaningful step before the noise returns.",
        guidance: "Intentional action from a calm state"
      },
      rock: {
        title: "Grounded Momentum",
        snapshot: "You may feel calm with a spark of energy underneath.",
        prompt: "Protect your steadiness by choosing direction before speed.",
        tryThis: "Pick one bold task, not five, and begin there.",
        guidance: "Direction before acceleration"
      },
      white: {
        title: "Keep the Space Clean",
        snapshot: "A low-stimulation environment may be helping you stay centered.",
        prompt: "Maintain what works before chasing more input.",
        tryThis: "Keep your space uncluttered for the next 10 minutes of work or rest.",
        guidance: "Environmental support"
      }
    },
    focus: {
      rnb: {
        title: "Warm Focus",
        snapshot: "You seem both steady and emotionally open.",
        prompt: "This is a good moment for meaningful work without urgency.",
        tryThis: "Give one task your full attention for 10 minutes.",
        guidance: "Flow support"
      },
      classical: {
        title: "Organized Energy",
        snapshot: "Your mind may be ready for structure.",
        prompt: "Turn calm into clarity by making the path visible.",
        tryThis: "Outline your next task in 3 short bullet points.",
        guidance: "Task structuring"
      },
      rock: {
        title: "Steady Drive",
        snapshot: "You may be in a strong state for action.",
        prompt: "Use the energy, but keep the pace intentional.",
        tryThis: "Start the most challenging task for 5 minutes and stop there if needed.",
        guidance: "Purposeful activation"
      },
      white: {
        title: "Protected Concentration",
        snapshot: "Your calm may deepen when distractions stay low.",
        prompt: "Keep a boundary around your attention while it is working well.",
        tryThis: "Turn on Do Not Disturb for 15 minutes.",
        guidance: "Boundary setting for focus"
      }
    },
    relax: {
      rnb: {
        title: "Savor This Moment",
        snapshot: "Calm is not empty. It is useful, restorative space.",
        prompt: "Let yourself notice that not everything is urgent right now.",
        tryThis: "Write one sentence of gratitude for this moment.",
        guidance: "Gratitude practice"
      },
      classical: {
        title: "Gentle Reset",
        snapshot: "You seem settled enough to recover without disengaging.",
        prompt: "This is a good moment to restore yourself before the next demand.",
        tryThis: "Roll your shoulders and stretch your neck slowly for 20 seconds.",
        guidance: "Micro-recovery"
      },
      rock: {
        title: "Easy Confidence",
        snapshot: "You may feel light, positive, and ready, but not rushed.",
        prompt: "Let energy stay enjoyable by choosing what matters most.",
        tryThis: "Ask yourself: 'What is the one thing worth doing tonight?'",
        guidance: "Values-based action"
      },
      white: {
        title: "Quiet Maintenance",
        snapshot: "You seem okay, and that is worth preserving.",
        prompt: "You do not always need to improve the moment. Sometimes you just maintain it.",
        tryThis: "Close your eyes or look away from the screen for 60 seconds.",
        guidance: "Micro-rest"
      }
    }
  },

  excited: {
    quiet: {
      rnb: {
        title: "Warm Spark",
        snapshot: "Your energy feels lifted, but it does not need to become rushed.",
        prompt: "Enjoy the spark without letting it pull you too far ahead.",
        tryThis: "Take 3 slower breaths before making your next move.",
        guidance: "Impulse regulation"
      },
      classical: {
        title: "Shape the Energy",
        snapshot: "You may have a lot of mental energy available right now.",
        prompt: "Structure helps excitement stay useful.",
        tryThis: "Capture your best idea in 3 bullet points before doing anything else.",
        guidance: "Idea capture + cognitive organization"
      },
      rock: {
        title: "Aim the Fire",
        snapshot: "You seem energized and ready to act.",
        prompt: "Strong energy works best when it has direction.",
        tryThis: "Choose one bold next step and commit only to that.",
        guidance: "Directional channeling"
      },
      white: {
        title: "Clear the Signal",
        snapshot: "Excitement can bring good ideas and scattered attention at the same time.",
        prompt: "Lower the noise so the best idea can stay clear.",
        tryThis: "Write down one idea to keep, and let the rest wait.",
        guidance: "Attentional narrowing"
      }
    },
    focus: {
      rnb: {
        title: "Flow Is Close",
        snapshot: "You may be emotionally engaged and ready to begin.",
        prompt: "This is a strong moment for meaningful progress.",
        tryThis: "Give yourself one uninterrupted 10-minute flow block.",
        guidance: "Flow support"
      },
      classical: {
        title: "Structured Momentum",
        snapshot: "Your energy may work best with a simple plan.",
        prompt: "Let structure hold the excitement so it can last.",
        tryThis: "Make a mini-plan: 1) start, 2) continue, 3) stop point.",
        guidance: "Planful activation"
      },
      rock: {
        title: "Controlled Sprint",
        snapshot: "You are highly activated and ready to move.",
        prompt: "Use the drive, but keep the edges clear so you do not overshoot.",
        tryThis: "Do a 5-minute sprint, then take a 1-minute pause before continuing.",
        guidance: "Pacing for high activation"
      },
      white: {
        title: "Keep the Lane Narrow",
        snapshot: "Excitement can be productive when attention stays contained.",
        prompt: "Pick one lane and stay in it long enough to finish part of it.",
        tryThis: "Single-task until your timer ends, with no switching.",
        guidance: "Single-task attention control"
      }
    },
    relax: {
      rnb: {
        title: "Enjoy the Lift",
        snapshot: "You seem energized in a pleasant, manageable way.",
        prompt: "Let this feel good without turning it into pressure to do everything.",
        tryThis: "Smile, lower your shoulders, and choose one thing to enjoy or finish.",
        guidance: "Savoring + self-regulation"
      },
      classical: {
        title: "Steady the Spark",
        snapshot: "Your mood is lifted, and your system may be ready for a balanced next step.",
        prompt: "A calmer pace can help good energy last longer.",
        tryThis: "Slow your exhale once before making your next decision.",
        guidance: "Pace regulation"
      },
      rock: {
        title: "Celebrate, Then Channel",
        snapshot: "You have energy to use, but it does not all need to be used now.",
        prompt: "Let motivation become one action, not ten promises.",
        tryThis: "Pick one intentional action and stop after you start it.",
        guidance: "Impulse containment"
      },
      white: {
        title: "Cool Into Clarity",
        snapshot: "Your energy is high, and your mind may benefit from a softer frame.",
        prompt: "Let the best idea stay. The rest can wait.",
        tryThis: "Write one sentence: 'The most important thing right now is…'",
        guidance: "Cognitive focusing"
      }
    }
  }
};

// =============================
// Helpers
// =============================
function getCheckedValue(name) {
  var el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? el.value : "";
}

function labelForValue(group, value) {
  var map = {
    mood: {
      tired: "Tired",
      anxious: "Anxious",
      calm: "Calm",
      excited: "Excited"
    },
    atm: {
      quiet: "Quiet",
      focus: "Focused",
      relax: "Relaxed"
    },
    sound: {
      rnb: "R&B",
      classical: "Classical",
      rock: "Rock",
      white: "White Noise"
    }
  };

  return (map[group] && map[group][value]) ? map[group][value] : value;
}

function getCard(mood, atm, sound) {
  if (
    emotionalCards[mood] &&
    emotionalCards[mood][atm] &&
    emotionalCards[mood][atm][sound]
  ) {
    return emotionalCards[mood][atm][sound];
  }

  return {
    title: "Gentle Check-In",
    snapshot: "Take a moment to notice how you are feeling.",
    prompt: "Choose one small next step that feels manageable.",
    tryThis: "Pause for one breath and decide what would help most right now.",
    guidance: "Self-awareness"
  };
}

// =============================
// Result updater
// Make sure your HTML has these ids:
// outMood, outAtm, outSound, outPrompt
// Optional ids:
// outTitle, outSnapshot, outTryThis, outGuidance
// =============================
function updateResult() {
  var mood = getCheckedValue("mood");
  var atm = getCheckedValue("atm");
  var sound = getCheckedValue("sound");

  var card = getCard(mood, atm, sound);

  var outMood = document.getElementById("outMood");
  var outAtm = document.getElementById("outAtm");
  var outSound = document.getElementById("outSound");

  //var outTitle = document.getElementById("outTitle");
  //var outSnapshot = document.getElementById("outSnapshot");
  //var outPrompt = document.getElementById("outPrompt");
 // var outTryThis = document.getElementById("outTryThis");
  //var outGuidance = document.getElementById("outGuidance");
var outTitle = document.getElementById("outTitle");
var outIntro = document.getElementById("outIntro");
var outCardText = document.getElementById("outCardText");
var outAction = document.getElementById("outAction");


  if (outMood) outMood.textContent = labelForValue("mood", mood);
  if (outAtm) outAtm.textContent = labelForValue("atm", atm);
  if (outSound) outSound.textContent = labelForValue("sound", sound);

  //if (outTitle) outTitle.textContent = card.title;
  //if (outSnapshot) outSnapshot.textContent = card.snapshot;
  //if (outPrompt) outPrompt.textContent = card.prompt;
  //if (outTryThis) outTryThis.textContent = card.tryThis;
  //if (outGuidance) outGuidance.textContent = card.guidance;
	if (outTitle) outTitle.textContent = card.title;

if (outIntro) {
  outIntro.textContent = "Based on your mood, atmosphere, and music choice, this card reflects what your current state might need most.";
}

if (outCardText) {
  outCardText.textContent = card.snapshot + " " + card.prompt;
}

if (outAction) {
  outAction.textContent = "Try this now: " + card.tryThis;
}
	
}
	
	
////////
	
	
	
	
// Start button
var btnStart = document.getElementById("btnStart");
if (btnStart) {
  btnStart.addEventListener("click", function () {
    showScreen(getScreenIndexById("screen-mood"));
  });
}

// Back pills
document.addEventListener("click", function (e) {
  var t = e.target;

  while (t && t !== document.body) {
    if (t.hasAttribute && t.hasAttribute("data-back")) {
      e.preventDefault();
      showScreen(current - 1);
      return;
    }
    t = t.parentNode;
  }
});

// Auto-advance on selection
function autoAdvanceOnChange(groupName, nextScreenId) {
  var inputs = document.querySelectorAll('input[name="' + groupName + '"]');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", function () {
      showScreen(getScreenIndexById(nextScreenId));
    });
  }
}

autoAdvanceOnChange("mood", "screen-atmosphere");
autoAdvanceOnChange("atm", "screen-sound");
autoAdvanceOnChange("sound", "screen-result");

// ---- Shared hover / locked background system ----
var previewAudio = new Audio();
previewAudio.preload = "none";
previewAudio.volume = 0.6;

var audioUnlocked = false;
var lockedChoiceBgClass = "";

document.addEventListener("click", function () {
  audioUnlocked = true;
}, { once: true });

function getAllBgClasses() {
  var pills = document.querySelectorAll(".pillBtn[data-bg]");
  var classes = [];

  for (var i = 0; i < pills.length; i++) {
    var bgClass = pills[i].getAttribute("data-bg");
    if (bgClass && classes.indexOf(bgClass) === -1) {
      classes.push(bgClass);
    }
  }

  return classes;
}

function clearChoiceBackgrounds() {
  var classes = getAllBgClasses();
  for (var i = 0; i < classes.length; i++) {
    document.body.classList.remove(classes[i]);
  }
}

function applyLockedChoiceBackground() {
  if (lockedChoiceBgClass) {
    document.body.classList.add(lockedChoiceBgClass);
  }
}

function restoreLockedChoiceBackground() {
  clearChoiceBackgrounds();
  applyLockedChoiceBackground();
}

function previewChoiceBackground(bgClass) {
  restoreLockedChoiceBackground();
  if (bgClass) {
    document.body.classList.add(bgClass);
  }
}

function stopPreview() {
  try {
    previewAudio.pause();
    previewAudio.currentTime = 0;
  } catch (e) {
    // ignore audio reset errors
  }

  restoreLockedChoiceBackground();
}

function playPreview(src, bgClass) {
  previewChoiceBackground(bgClass);

  if (!src) return;
  if (!audioUnlocked) return;

  if (previewAudio.src.indexOf(src) === -1) {
    previewAudio.src = src;
  }

  try {
    previewAudio.currentTime = 0;
  } catch (e) {

  }

  var p = previewAudio.play();
  if (p && typeof p.catch === "function") {
    p.catch(function () {
      // ignore autoplay block errors
    });
  }
}

// Hover
var bgPills = document.querySelectorAll(".pillBtn[data-bg]");

for (var j = 0; j < bgPills.length; j++) {
  (function (pill) {
    function handleEnter() {
      var bgClass = pill.getAttribute("data-bg");
      var src = pill.getAttribute("data-preview");

      if (src) {
        playPreview(src, bgClass);
      } else {
        stopPreview();
        previewChoiceBackground(bgClass);
      }
    }

    function handleLeave() {
      stopPreview();
    }

    pill.addEventListener("mouseenter", handleEnter);
    pill.addEventListener("mouseleave", handleLeave);
    pill.addEventListener("focusin", handleEnter);
    pill.addEventListener("focusout", handleLeave);
  })(bgPills[j]);
}

// Lock the chosen background after selection
var choiceInputs = document.querySelectorAll('.pillBtn[data-bg] input[type="radio"]');

for (var k = 0; k < choiceInputs.length; k++) {
  choiceInputs[k].addEventListener("change", function () {
    var pill = this.closest(".pillBtn");
    if (!pill) return;

    lockedChoiceBgClass = pill.getAttribute("data-bg") || "";
    stopPreview();
  });
}

function resetApp() {
  lockedChoiceBgClass = "";

  var radios = document.querySelectorAll('input[type="radio"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }

  stopPreview();
  clearChoiceBackgrounds();

  var outMood = document.getElementById("outMood");
  var outAtm = document.getElementById("outAtm");
  var outSound = document.getElementById("outSound");
  var outTitle = document.getElementById("outTitle");
  var outIntro = document.getElementById("outIntro");
  var outCardText = document.getElementById("outCardText");
  var outAction = document.getElementById("outAction");

  if (outMood) outMood.textContent = "Okay";
  if (outAtm) outAtm.textContent = "Quiet";
  if (outSound) outSound.textContent = "Ambient";
  if (outTitle) outTitle.textContent = "Card Title";
  if (outIntro) outIntro.textContent = "";
  if (outCardText) outCardText.textContent = "";
  if (outAction) outAction.textContent = "";
	
	updateProgress();
}

// Restart on result screen
var btnRestart = document.getElementById("btnRestart");
if (btnRestart) {
  btnRestart.addEventListener("click", function () {
    resetApp();
    showScreen(getScreenIndexById("screen-intro"));
  });
}

showScreen(getScreenIndexById("screen-intro"));
})();