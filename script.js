const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = '<div class="loading-mark" aria-hidden="true"><span></span><span></span><span></span></div><strong>Edunova</strong><span class="loading-label">Preparing your learning space</span>';
document.body.prepend(loadingScreen);

window.addEventListener('load', () => {
    window.setTimeout(() => loadingScreen.classList.add('is-ready'), 180);
    window.setTimeout(() => loadingScreen.remove(), 620);
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

document.querySelectorAll('.brand').forEach((brand) => {
    brand.setAttribute('aria-label', 'Edunova home');
    const brandName = brand.querySelector(':scope > span:last-child');
    if (brandName) brandName.textContent = 'Edunova';
});

localStorage.removeItem('edunovaTheme');
document.documentElement.dataset.theme = 'light';

document.querySelector('#light-theme')?.classList.add('active');

const languageChoice = document.querySelector('#language-choice');
const savedLanguage = localStorage.getItem('edunovaLanguage') || 'en';
document.documentElement.lang = savedLanguage;

const interfaceTranslations = {
    hi: {
        Home: 'होम', Learn: 'सीखें', 'AI Tutor': 'AI ट्यूटर', 'Voice Assistant': 'वॉइस असिस्टेंट', Profile: 'प्रोफ़ाइल', 'Log in': 'लॉग इन', 'Log out': 'लॉग आउट', 'Continue learning': 'सीखना जारी रखें', 'Start Learning': 'सीखना शुरू करें', 'Choose your theme': 'अपनी थीम चुनें', 'Choose your language': 'अपनी भाषा चुनें', Appearance: 'दिखावट', Language: 'भाषा', Light: 'लाइट', Dark: 'डार्क', 'Your learning profile': 'आपकी सीखने की प्रोफ़ाइल', 'Keep your momentum.': 'अपनी गति बनाए रखें।', 'Your quantum copilot': 'आपका क्वांटम सहायक', 'Ask better questions.': 'बेहतर सवाल पूछें।'
    },
    ta: {
        Home: 'முகப்பு', Learn: 'கற்றல்', 'AI Tutor': 'AI ஆசிரியர்', 'Voice Assistant': 'குரல் உதவியாளர்', Profile: 'சுயவிவரம்', 'Log in': 'உள்நுழைவு', 'Log out': 'வெளியேறு', 'Continue learning': 'கற்றலைத் தொடருங்கள்', 'Start Learning': 'கற்றலைத் தொடங்கு', 'Choose your theme': 'தீமைத் தேர்ந்தெடுக்கவும்', 'Choose your language': 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்', Appearance: 'தோற்றம்', Language: 'மொழி', Light: 'ஒளி', Dark: 'இருள்', 'Your learning profile': 'உங்கள் கற்றல் சுயவிவரம்', 'Keep your momentum.': 'உங்கள் முன்னேற்றத்தைத் தொடருங்கள்.', 'Your quantum copilot': 'உங்கள் குவாண்டம் உதவியாளர்', 'Ask better questions.': 'சிறந்த கேள்விகளைக் கேளுங்கள்.'
    }
};

function translateInterface(language) {
    const dictionary = interfaceTranslations[language];
    if (!dictionary) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
        const original = node.nodeValue.trim();
        if (dictionary[original]) node.nodeValue = node.nodeValue.replace(original, dictionary[original]);
    });
}

translateInterface(savedLanguage);
if (languageChoice) {
    languageChoice.value = savedLanguage;
    languageChoice.addEventListener('change', () => {
        document.documentElement.lang = languageChoice.value;
        localStorage.setItem('edunovaLanguage', languageChoice.value);
        window.location.reload();
    });
}

const isLoggedIn = sessionStorage.getItem('edunovaLoggedIn') === 'true' || localStorage.getItem('edunovaUser');
const currentPage = window.location.pathname.split(/[\\/]/).pop().toLowerCase();
const protectedPages = new Set([
    'learn.html',
    'tutor.html',
    'voice.html',
    'profile.html',
    'algorithm.html',
    'quiz.html',
]);

if (protectedPages.has(currentPage) && !isLoggedIn) {
    window.location.replace('login.html?redirect=' + encodeURIComponent(currentPage + window.location.search));
}

const algorithmDetails = {
    deutsch: {
        title: "Deutsch's Algorithm",
        summary: 'Determines whether a one-bit function is constant or balanced with a single quantum query.',
        explanation: 'Deutsch\'s Algorithm uses superposition and interference to evaluate both possible inputs together. After one query to the function, the final measurement reveals whether both inputs produce the same output or different outputs.',
        examples: ['Testing whether f(0) and f(1) are equal.', 'Classifying a simple binary oracle.', 'Demonstrating quantum advantage with one query.']
    },
    'deutsch-jozsa': {
        title: 'Deutsch-Jozsa Algorithm',
        summary: 'Uses quantum interference to identify whether a promised function is constant or balanced.',
        explanation: 'The algorithm prepares many inputs in superposition, queries the hidden function once, and uses interference to separate the two cases. A classical method may need many queries, while the quantum circuit needs only one under the promise.',
        examples: ['Checking whether a promised function is constant.', 'Testing a balanced four-input oracle.', 'Comparing quantum and classical query counts.']
    },
    'bernstein-vazirani': {
        title: 'Bernstein-Vazirani Algorithm',
        summary: 'Finds a hidden binary string using one quantum query instead of checking each bit separately.',
        explanation: 'A hidden string controls the output of a linear function. Phase kickback encodes that string into the amplitudes of a superposition, and a final layer of Hadamard gates reveals every bit in one measurement.',
        examples: ['Finding the hidden string 1011.', 'Recovering a secret key from a linear oracle.', 'Learning several hidden bits with one query.']
    },
    simons: {
        title: "Simon's Algorithm",
        summary: 'Finds a hidden period in a black-box function and demonstrates an exponential quantum speedup.',
        explanation: "Simon's problem hides a secret bit string that makes two inputs produce the same output. Repeated quantum queries create equations about that secret, which can then be solved with classical linear algebra.",
        examples: ['Finding a hidden XOR mask.', 'Solving a periodic black-box function.', 'Generating equations for a classical solver.']
    },
    grover: {
        title: "Grover's Algorithm",
        summary: 'Searches an unstructured database in roughly the square root of the number of entries.',
        explanation: "Grover's Algorithm marks the desired answer with an oracle and repeatedly amplifies its probability. The diffusion step boosts the marked state while reducing the others, giving a quadratic speedup for unstructured search.",
        examples: ['Searching for one item in an unsorted list.', 'Finding a password candidate that satisfies a checker.', 'Locating a solution among four database entries.']
    },
    qft: {
        title: 'Quantum Fourier Transform',
        summary: 'Reveals periodic structure in quantum states and supports phase estimation and period-finding.',
        explanation: 'The Quantum Fourier Transform changes a state from the computational basis into a frequency-like basis. Repeating patterns become measurable peaks, making the transform useful for phase estimation and Shor\'s Algorithm.',
        examples: ['Detecting a period of 4 in a sequence.', 'Converting amplitudes into frequency information.', 'Preparing the period-finding step of Shor\'s Algorithm.']
    },
    shor: {
        title: "Shor's Algorithm",
        summary: 'Factors large integers by combining quantum period-finding with classical number theory.',
        explanation: "Shor's Algorithm turns factoring into a period-finding problem. A quantum circuit finds the period of a modular function, and classical arithmetic uses that period to recover non-trivial factors of the original number.",
        examples: ['Factoring 15 into 3 and 5.', 'Finding the period of 7^x mod 15.', 'Explaining why large RSA keys are important.']
    },
    qpe: {
        title: 'Quantum Phase Estimation',
        summary: 'Estimates the phase associated with an eigenvalue and powers many advanced quantum algorithms.',
        explanation: 'Quantum Phase Estimation applies controlled powers of a unitary operation to encode an eigenvalue phase into an auxiliary register. The inverse Quantum Fourier Transform then converts that phase into a readable binary estimate.',
        examples: ['Estimating the phase of a rotation gate.', 'Measuring an eigenvalue of a unitary operator.', 'Supplying the phase estimate used by Shor\'s Algorithm.']
    },
    vqe: {
        title: 'VQE: Variational Quantum Eigensolver',
        summary: 'Uses a parameterized circuit and a classical optimizer to estimate molecular ground-state energies.',
        explanation: 'VQE prepares a trial quantum state, measures its energy, and sends that result to a classical optimizer. The optimizer changes the circuit parameters and repeats the loop until the estimated energy is minimized.',
        examples: ['Estimating the ground-state energy of H2.', 'Optimizing a small molecular circuit.', 'Running a chemistry workflow on noisy hardware.']
    },
    qaoa: {
        title: 'QAOA: Quantum Approximate Optimization Algorithm',
        summary: 'Uses alternating quantum operators to search for good solutions to combinatorial optimization problems.',
        explanation: 'QAOA alternates a problem operator, which scores candidate solutions, with a mixing operator, which explores alternatives. A classical optimizer adjusts the circuit parameters to increase the probability of high-quality solutions.',
        examples: ['Finding a good route through connected cities.', 'Solving a small graph-cut problem.', 'Searching for a low-cost assignment of tasks.']
    },
    hhl: {
        title: 'HHL Algorithm',
        summary: 'Uses a quantum system to estimate the solution of certain linear systems.',
        explanation: 'The HHL algorithm prepares a quantum representation of a linear system, estimates eigenvalue information, and rotates an auxiliary qubit to encode the solution. Measuring the system reveals useful properties of that solution.',
        examples: ['Estimating a solution to a sparse matrix equation.', 'Modeling a small physical system.', 'Exploring quantum linear algebra.']
    },
    'quantum-walk': {
        title: 'Quantum Walk Algorithm',
        summary: 'Uses quantum interference in a walk to speed up search and graph problems.',
        explanation: 'A quantum walk spreads across graph paths in superposition. Interference can increase the amplitude of useful paths and decrease unhelpful ones, supporting search, element distinctness, and graph algorithms.',
        examples: ['Searching vertices in a graph.', 'Finding marked locations in a network.', 'Studying quantum transport.']
    },
    'amplitude-estimation': {
        title: 'Amplitude Estimation',
        summary: 'Estimates the probability encoded in a quantum amplitude with quadratic speedup.',
        explanation: 'Amplitude Estimation combines a state-preparation routine with phase estimation to learn the probability of a desired outcome. It is useful for quantum Monte Carlo and risk analysis.',
        examples: ['Estimating a Monte Carlo probability.', 'Evaluating financial risk.', 'Measuring the success rate of a quantum process.']
    },
    'quantum-counting': {
        title: 'Quantum Counting',
        summary: 'Estimates how many solutions satisfy a condition by combining search and phase estimation.',
        explanation: 'Quantum Counting applies phase estimation to the Grover operator. The measured phase is related to the number of marked states, allowing the solution count to be estimated without checking every item.',
        examples: ['Counting satisfying database entries.', 'Estimating solutions to a constraint.', 'Measuring the size of a marked set.']
    },
    'iterative-phase': {
        title: 'Iterative Phase Estimation',
        summary: 'Estimates an eigenvalue phase using a smaller and more repeatable quantum circuit.',
        explanation: 'Iterative Phase Estimation learns phase bits one at a time instead of using a large phase register. Classical feedback chooses the next measurement setting, reducing the number of qubits required.',
        examples: ['Estimating the phase of a rotation.', 'Measuring an eigenvalue on a small device.', 'Reducing the register size in phase estimation.']
    },
    'amplitude-amplification': {
        title: 'Amplitude Amplification',
        summary: 'Boosts the probability of desired states using a generalization of Grover\'s method.',
        explanation: 'Amplitude Amplification repeatedly reflects a state around the average amplitude and around the desired subspace. These reflections increase the chance of measuring a successful result.',
        examples: ['Speeding up a probabilistic algorithm.', 'Searching with a custom state-preparation routine.', 'Generalizing Grover search.']
    },
    qsp: {
        title: 'Quantum Signal Processing',
        summary: 'Transforms encoded eigenvalues through carefully chosen sequences of quantum phases.',
        explanation: 'Quantum Signal Processing uses a sequence of controlled phase rotations to implement a polynomial transformation of a signal encoded in a unitary operator. It is a building block for many modern quantum algorithms.',
        examples: ['Implementing a polynomial filter.', 'Transforming eigenvalue information.', 'Building block encodings for quantum linear algebra.']
    },
    qsvt: {
        title: 'Quantum Singular Value Transformation',
        summary: 'Applies polynomial transformations to singular values inside a quantum circuit.',
        explanation: 'QSVT extends quantum signal processing to block-encoded matrices. By selecting a polynomial, a circuit can transform singular values and support tasks such as linear solving, search, and simulation.',
        examples: ['Filtering a block-encoded matrix.', 'Supporting quantum linear-system algorithms.', 'Designing polynomial matrix transformations.']
    },
    'quantum-k-means': {
        title: 'Quantum k-Means',
        summary: 'Explores quantum methods for grouping data points into clusters.',
        explanation: 'Quantum k-Means uses quantum states or distance estimation routines to compare data points with cluster centers. A classical update step then refines the clusters over repeated iterations.',
        examples: ['Grouping similar data points.', 'Estimating distances with quantum states.', 'Exploring hybrid quantum machine learning.']
    },
    qsvm: {
        title: 'Quantum Support Vector Machine',
        summary: 'Uses quantum feature maps and kernels to classify data points.',
        explanation: 'A Quantum Support Vector Machine maps data into a quantum feature space and estimates similarities with a quantum kernel. A classical support-vector optimizer uses those similarities to find a decision boundary.',
        examples: ['Classifying two data categories.', 'Comparing quantum feature maps.', 'Training a hybrid quantum classifier.']
    },
    'basic-gates': {
        title: 'Basic Quantum Gates',
        summary: 'Introduces the Identity, X (NOT), and H (Hadamard) gates and their effect on qubit states.',
        explanation: 'Quantum gates are reversible operations that change a qubit state. The Identity gate leaves the state unchanged, the X gate flips |0> and |1>, and the Hadamard gate creates or removes an equal superposition.',
        examples: ['Using Identity to preserve a qubit state.', 'Using X to flip |0> to |1> and |1> to |0>.', 'Using H to create superposition from a basis state.']
    }
};

const algorithmPage = document.querySelector('[data-algorithm-page]');
if (algorithmPage) {
    const topic = new URLSearchParams(window.location.search).get('topic');
    const algorithm = algorithmDetails[topic] || algorithmDetails.deutsch;
    algorithmPage.querySelector('[data-algorithm-title]').textContent = algorithm.title;
    algorithmPage.querySelector('[data-algorithm-summary]').textContent = algorithm.summary;
    algorithmPage.querySelector('[data-algorithm-explanation]').textContent = algorithm.explanation;
    const examplesList = algorithmPage.querySelector('[data-algorithm-examples]');
    examplesList.replaceChildren(...algorithm.examples.map((example) => {
        const item = document.createElement('li');
        item.textContent = example;
        return item;
    }));
    const basicGatesTable = algorithmPage.querySelector('[data-basic-gates-table]');
    if (basicGatesTable) basicGatesTable.hidden = topic !== 'basic-gates';
    document.title = algorithm.title + ' | Edunova';
}

document.querySelectorAll('.login-nav-link').forEach((loginLink) => {
    loginLink.hidden = Boolean(isLoggedIn);
});

const storedUser = JSON.parse(localStorage.getItem('edunovaCurrentUser') || sessionStorage.getItem('edunovaCurrentUser') || 'null');
document.querySelectorAll('[data-user-name]').forEach((element) => {
    if (storedUser) element.textContent = storedUser.name;
});
document.querySelectorAll('[data-user-email]').forEach((element) => {
    if (storedUser) element.textContent = storedUser.email;
});
document.querySelectorAll('[data-user-initial]').forEach((element) => {
    if (storedUser) element.textContent = storedUser.name.charAt(0).toUpperCase();
});

const logoutButton = document.querySelector('#logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('edunovaUser');
        localStorage.removeItem('edunovaCurrentUser');
        sessionStorage.removeItem('edunovaLoggedIn');
        sessionStorage.removeItem('edunovaCurrentUser');
        window.location.replace('login.html');
    });
}

const voiceButton = document.querySelector('#voice-button');
if (voiceButton) {
    const voiceStatus = document.querySelector('#voice-status');
    const voiceTranscript = document.querySelector('#voice-transcript');
    const voiceAnswer = document.querySelector('#voice-answer');
    const voiceOrb = document.querySelector('#voice-orb');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const voiceAnswers = {
        qubit: 'A qubit is the basic unit of quantum information. Unlike a normal bit, it can be a blend of zero and one until it is measured.',
        superposition: 'Superposition means a qubit can hold multiple possibilities at once. Measurement gives one definite result.',
        gate: 'A quantum gate changes a qubit state. The Hadamard gate creates superposition, while the X gate flips zero to one.',
        entanglement: 'Entanglement connects qubits so their measurement results are strongly related, even when the qubits are far apart.',
        circuit: 'A quantum circuit is a sequence of gates applied to qubits. Wires show the qubits and symbols show the operations.',
        phase: 'Phase is a property of a quantum wave. Interference can strengthen useful possibilities and cancel unhelpful ones.',
        deutsch: 'The Deutsch and Deutsch-Jozsa algorithms discover whether a hidden function has a global property using very few queries.',
        grover: 'Grover’s algorithm searches an unstructured list in about the square root of N steps by amplifying the correct answer.',
        fourier: 'The Quantum Fourier Transform reveals repeating patterns and helps with phase estimation and period finding.',
        qft: 'The Quantum Fourier Transform reveals repeating patterns and helps with phase estimation and period finding.',
        shor: 'Shor’s algorithm uses quantum period finding to factor large numbers. A classical computer then completes the calculation.',
        vqe: 'VQE uses a small quantum circuit and a classical optimizer together to estimate molecular energy on noisy hardware.',
        'deutsch-jozsa': 'Deutsch-Jozsa determines whether a promised function is constant or balanced using quantum interference.',
        'bernstein-vazirani': 'Bernstein-Vazirani finds a hidden binary string with one quantum query.',
        simon: 'Simon’s algorithm finds a hidden XOR period by collecting equations from repeated quantum measurements.',
        qpe: 'Quantum Phase Estimation estimates the phase associated with an eigenvalue of a unitary operator.',
        qaoa: 'QAOA alternates a problem operator and a mixer to search for good solutions to combinatorial problems.',
        hhl: 'The HHL algorithm estimates properties of solutions to certain sparse linear systems using quantum linear algebra.',
        'quantum walk': 'Quantum Walk algorithms use interference across graph paths to improve search and graph problem performance.',
        'amplitude estimation': 'Amplitude Estimation measures a probability encoded in a quantum amplitude and supports quantum Monte Carlo methods.',
        'quantum counting': 'Quantum Counting combines Grover search with phase estimation to estimate the number of marked solutions.',
        'iterative phase estimation': 'Iterative Phase Estimation learns phase bits one at a time with a smaller quantum register and classical feedback.',
        'amplitude amplification': 'Amplitude Amplification increases the probability of desired states and generalizes Grover’s search method.',
        'quantum signal processing': 'Quantum Signal Processing uses controlled phase sequences to implement polynomial transformations of encoded eigenvalues.',
        qsp: 'Quantum Signal Processing uses controlled phase sequences to implement polynomial transformations of encoded eigenvalues.',
        qsvt: 'QSVT applies polynomial transformations to singular values of a block-encoded matrix.',
        'quantum k-means': 'Quantum k-Means explores quantum distance estimation inside a hybrid method for grouping data into clusters.',
        qsvm: 'A Quantum Support Vector Machine uses quantum feature maps and kernels to classify data points.'
    };

    function answerVoiceQuestion(question) {
        const normalizedQuestion = question.toLowerCase();
        const keyword = Object.keys(voiceAnswers).find((item) => normalizedQuestion.includes(item));
        const answer = keyword ? voiceAnswers[keyword] : 'I can explain all 20 algorithms: Deutsch, Deutsch-Jozsa, Bernstein-Vazirani, Simon, Grover, QFT, Shor, QPE, VQE, QAOA, HHL, Quantum Walk, Amplitude Estimation, Quantum Counting, Iterative Phase Estimation, Amplitude Amplification, QSP, QSVT, Quantum k-Means, and QSVM.';
        voiceAnswer.innerHTML = '<span>Edunova voice tutor</span><p>' + answer + '</p>';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(answer));
    }

    if (!SpeechRecognition) {
        voiceStatus.textContent = 'Voice input is not supported in this browser. Try Chrome or Edge.';
        voiceButton.disabled = true;
    } else {
        const recognition = new SpeechRecognition();
        let isListening = false;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.maxAlternatives = 1;
        recognition.addEventListener('start', () => {
            isListening = true;
            voiceOrb.classList.add('is-listening');
            voiceButton.classList.add('is-listening');
            voiceButton.innerHTML = '<span>&#9632;</span> Stop listening';
            voiceTranscript.textContent = 'Listening for your question...';
            voiceStatus.textContent = 'Speak now. I will answer when you pause.';
        });
        recognition.addEventListener('result', (event) => {
            let transcript = '';
            for (let index = event.resultIndex; index < event.results.length; index += 1) {
                transcript += event.results[index][0].transcript;
            }
            voiceTranscript.textContent = '“' + transcript + '”';
            if (event.results[event.results.length - 1].isFinal) answerVoiceQuestion(transcript);
        });
        recognition.addEventListener('end', () => {
            isListening = false;
            voiceOrb.classList.remove('is-listening');
            voiceButton.classList.remove('is-listening');
            voiceButton.innerHTML = '<span>&#9835;</span> Start listening';
            voiceStatus.textContent = 'Press the microphone to ask another question.';
        });
        recognition.addEventListener('error', (event) => {
            isListening = false;
            voiceStatus.textContent = event.error === 'not-allowed' ? 'Microphone access was blocked. Allow microphone access and try again.' : 'I could not hear that. Please speak closer to the microphone.';
        });
        voiceButton.addEventListener('click', () => {
            if (isListening) {
                recognition.stop();
                return;
            }
            voiceTranscript.textContent = 'Listening for your question...';
            try {
                recognition.start();
            } catch (error) {
                voiceStatus.textContent = 'The microphone is already starting. Please try again.';
            }
        });
    }
}


if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    document.querySelectorAll('.nav-link, .profile-link').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });
}

document.querySelectorAll('.module-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const module = trigger.closest('.curriculum-item');
        const isOpen = module.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(isOpen));
    });
});

const tutorForm = document.querySelector('#tutor-form');

if (tutorForm) {
    const tutorQuestion = tutorForm.querySelector('input');
    const promptStatus = document.querySelector('#prompt-status');
    const tutorResponse = document.querySelector('#tutor-response');
    const tutorMic = document.querySelector('#tutor-mic');
    const topicPrompts = document.querySelectorAll('[data-topic]');

    const topicAnswers = {
        qubits: ['Introduction to Quantum Mechanics & Qubits', 'A normal bit is either 0 or 1. A qubit can hold a blend of both possibilities until it is measured. We write the basic states as |0> and |1>. Measurement gives one result and ends the blend.'],
        gates: ['Single-Qubit Gates & Superposition', 'A quantum gate changes a qubit\'s state. The X gate flips it, while the Hadamard gate creates an even blend of 0 and 1. The Bloch Sphere is a visual map that helps us see these changes.'],
        entanglement: ['Multi-Qubit Systems & Entanglement', 'Entanglement connects qubits so their results are related, even when they are far apart. A CNOT gate, often combined with a Hadamard gate, can create an entangled Bell State.'],
        circuits: ['Quantum Circuits & Reversible Logic', 'A quantum circuit is a recipe: wires represent qubits and symbols represent gates. Operations must be reversible, so information is preserved until measurement turns it into ordinary bits.'],
        interference: ['Quantum Phase & Interference', 'Quantum states behave like waves. Waves that line up become stronger, and waves that oppose each other cancel. Algorithms use this to make useful answers more likely.'],
        foundations: ['Foundational Quantum Algorithms', 'Deutsch and Deutsch-Jozsa use interference to learn a global property of a hidden function with fewer queries than a classical approach. They are early examples of quantum advantage.'],
        grover: ["Quantum Search & Amplitude Amplification", "Grover's algorithm searches an unstructured list by marking the correct answer and repeatedly amplifying its probability. It needs about the square root of N queries instead of N queries."],
        qft: ['Quantum Phase Estimation & Fourier Transform', 'The Quantum Fourier Transform reveals repeating patterns in a quantum state. Phase Estimation measures hidden phase values, which helps algorithms such as Shor\'s algorithm.'],
        shor: ["Shor's Factoring Algorithm", "Shor's algorithm turns factoring into a period-finding problem. The quantum computer finds the period, and a classical computer uses it to calculate factors. Large-scale versions could threaten RSA encryption."],
        hybrid: ['Variational Quantum & Hybrid AI Algorithms', 'VQE and QAOA use a small quantum circuit together with a classical optimizer. The classical computer adjusts circuit parameters, making these methods practical for noisy current devices and machine-learning workflows.'],
        deutsch: ["Deutsch's Algorithm", 'Deutsch’s Algorithm uses one quantum query to determine whether a one-bit function is constant or balanced.'],
        'deutsch-jozsa': ['Deutsch-Jozsa Algorithm', 'Deutsch-Jozsa uses superposition and interference to classify a promised function as constant or balanced.'],
        'bernstein-vazirani': ['Bernstein-Vazirani Algorithm', 'Bernstein-Vazirani reveals a hidden binary string by encoding it into phases and measuring after interference.'],
        simons: ["Simon's Algorithm", 'Simon’s Algorithm finds a hidden XOR period by collecting equations from repeated quantum measurements.'],
        qpe: ['Quantum Phase Estimation', 'Quantum Phase Estimation estimates the phase associated with an eigenvalue of a unitary operator.'],
        vqe: ['VQE: Variational Quantum Eigensolver', 'VQE combines a parameterized quantum circuit with a classical optimizer to estimate a molecular ground-state energy.'],
        qaoa: ['QAOA: Quantum Approximate Optimization Algorithm', 'QAOA alternates a problem operator and a mixer to search for good solutions to combinatorial problems.'],
        hhl: ['HHL Algorithm', 'HHL estimates properties of the solution to certain sparse linear systems using quantum linear algebra.'],
        'quantum-walk': ['Quantum Walk Algorithm', 'Quantum Walk algorithms use interference across graph paths to improve search and graph problem performance.'],
        'amplitude-estimation': ['Amplitude Estimation', 'Amplitude Estimation measures a probability encoded in a quantum amplitude and supports quantum Monte Carlo methods.'],
        'quantum-counting': ['Quantum Counting', 'Quantum Counting combines Grover search with phase estimation to estimate the number of marked solutions.'],
        'iterative-phase': ['Iterative Phase Estimation', 'Iterative Phase Estimation learns phase bits one at a time with a smaller quantum register and classical feedback.'],
        'amplitude-amplification': ['Amplitude Amplification', 'Amplitude Amplification increases the probability of desired states and generalizes the search step in Grover’s Algorithm.'],
        qsp: ['Quantum Signal Processing', 'Quantum Signal Processing uses controlled phase sequences to implement polynomial transformations of encoded eigenvalues.'],
        qsvt: ['Quantum Singular Value Transformation', 'QSVT applies polynomial transformations to singular values of a block-encoded matrix.'],
        'quantum-k-means': ['Quantum k-Means', 'Quantum k-Means explores quantum distance estimation inside a hybrid method for grouping data into clusters.'],
        qsvm: ['Quantum Support Vector Machine', 'A Quantum Support Vector Machine uses quantum feature maps and kernels to classify data.']
    };

    const keywords = {
        qubits: ['qubit', 'quantum mechanics', 'dirac', 'measurement', 'bit'],
        gates: ['gate', 'hadamard', 'pauli', 'superposition', 'bloch'],
        entanglement: ['entanglement', 'bell', 'cnot', 'tensor', 'multi-qubit'],
        circuits: ['circuit', 'reversible', 'register', 'operator'],
        interference: ['phase', 'interference', 'kickback', 'constructive', 'destructive'],
        foundations: ['deutsch', 'foundational', 'oracle', 'deterministic'],
        grover: ['grover', 'search', 'amplitude', 'diffusion'],
        qft: ['qft', 'fourier', 'phase estimation', 'qpe', 'period'],
        shor: ['shor', 'factoring', 'factor', 'rsa', 'order-finding'],
        hybrid: ['vqe', 'qaoa', 'variational', 'hybrid', 'nisq', 'machine learning'],
        deutsch: ['deutsch'],
        'deutsch-jozsa': ['deutsch-jozsa', 'deutsch jozsa'],
        'bernstein-vazirani': ['bernstein-vazirani', 'bernstein vazirani'],
        simons: ['simon', 'simons'],
        qpe: ['qpe', 'quantum phase estimation'],
        vqe: ['vqe', 'variational eigensolver'],
        qaoa: ['qaoa', 'approximate optimization'],
        hhl: ['hhl', 'linear systems'],
        'quantum-walk': ['quantum walk'],
        'amplitude-estimation': ['amplitude estimation'],
        'quantum-counting': ['quantum counting'],
        'iterative-phase': ['iterative phase estimation', 'iterative phase'],
        'amplitude-amplification': ['amplitude amplification'],
        qsp: ['quantum signal processing'],
        qsvt: ['qsvt', 'singular value transformation'],
        'quantum-k-means': ['quantum k-means', 'quantum k means'],
        qsvm: ['qsvm', 'support vector machine']
    };

    function showTopic(topic) {
        const answer = topicAnswers[topic];
        if (!tutorResponse) return;
        tutorResponse.innerHTML = '<span class="response-label">' + answer[0] + '</span><p>' + answer[1] + '</p>';
        topicPrompts.forEach((prompt) => prompt.classList.toggle('selected', prompt.dataset.topic === topic));
    }

    function findTopic(question) {
        return Object.keys(keywords).find((topic) => keywords[topic].some((keyword) => question.includes(keyword))) || null;
    }

    topicPrompts.forEach((prompt) => prompt.addEventListener('click', () => showTopic(prompt.dataset.topic)));

    if (tutorMic) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            tutorMic.disabled = true;
            tutorMic.title = 'Voice input is not supported in this browser';
        } else {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = true;
            recognition.continuous = false;
            recognition.maxAlternatives = 1;

            recognition.addEventListener('start', () => {
                tutorMic.classList.add('is-listening');
                tutorMic.setAttribute('aria-label', 'Stop voice input');
                promptStatus.textContent = 'Listening... ask your quantum question.';
            });
            recognition.addEventListener('result', (event) => {
                let transcript = '';
                for (let index = event.resultIndex; index < event.results.length; index += 1) {
                    transcript += event.results[index][0].transcript;
                }
                tutorQuestion.value = transcript;
            });
            recognition.addEventListener('end', () => {
                tutorMic.classList.remove('is-listening');
                tutorMic.setAttribute('aria-label', 'Ask AI Tutor with your voice');
                if (tutorQuestion.value.trim()) promptStatus.textContent = 'Your question is ready. Press the arrow to ask.';
                else promptStatus.textContent = '';
            });
            recognition.addEventListener('error', (event) => {
                tutorMic.classList.remove('is-listening');
                tutorMic.setAttribute('aria-label', 'Ask AI Tutor with your voice');
                promptStatus.textContent = event.error === 'not-allowed' ? 'Microphone access was blocked by the browser.' : 'I could not hear that. Please try again.';
            });
            tutorMic.addEventListener('click', () => {
                if (tutorMic.classList.contains('is-listening')) {
                    recognition.stop();
                    return;
                }
                try {
                    recognition.start();
                } catch (error) {
                    promptStatus.textContent = 'Voice input is already starting. Please try again.';
                }
            });
        }
    }

    tutorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            window.location.replace('login.html?redirect=tutor.html');
            return;
        }
        const question = tutorQuestion.value.trim();

        if (!question) {
            promptStatus.textContent = 'Type a question to start your tutor session.';
            tutorQuestion.focus();
            return;
        }

        const topic = findTopic(question.toLowerCase());
        if (topic && tutorResponse) {
            showTopic(topic);
            promptStatus.textContent = 'Here is a simple explanation for your question.';
        } else if (topic) {
            promptStatus.textContent = 'Your AI Tutor session is ready for: “' + question + '”';
        } else {
            if (!tutorResponse) {
                promptStatus.textContent = 'Try asking about a quantum topic.';
                tutorQuestion.value = '';
                return;
            }
            tutorResponse.innerHTML = '<span class="response-label">Let us start with the Learn topics</span><p>I can explain qubits, gates, entanglement, circuits, interference, foundational algorithms, Grover, QFT, Shor, VQE, and hybrid AI. Try asking about one of these.</p>';
            promptStatus.textContent = 'Try mentioning a quantum topic from the list above.';
        }
        tutorQuestion.value = '';
    });
}

const offlineUsers = {
    users: [
        { name: 'Dev', email: 'dev@example.com', password: 'dev123' },
        { name: 'Tharun_pranav', email: 'tharun_pranav@gmail.com', password: 'tharun_pranav123' },
        { name: 'Admin', email: 'Admin@example.com', password: 'Admin123' }
    ]
};

async function loadUsers() {
    try {
        const response = await fetch('users.json', { cache: 'no-store' });
        if (!response || !response.ok) {
            throw new Error('User data unavailable');
        }
        const data = await response.json();
        return Array.isArray(data.users) ? data.users : offlineUsers.users;
    } catch (error) {
        return offlineUsers.users;
    }
}

const loginForm = document.querySelector('#login-form');

if (loginForm) {
    const emailInput = document.querySelector('#login-email');
    const passwordInput = document.querySelector('#login-password');
    const passwordToggle = document.querySelector('#toggle-password');
    const rememberMe = document.querySelector('#remember-me');
    const loginStatus = document.querySelector('#login-status');

    passwordToggle.addEventListener('click', () => {
        const showingPassword = passwordInput.type === 'text';
        passwordInput.type = showingPassword ? 'password' : 'text';
        passwordToggle.textContent = showingPassword ? 'Show' : 'Hide';
        passwordToggle.setAttribute('aria-label', showingPassword ? 'Show password' : 'Hide password');
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        loginStatus.classList.remove('success');
        loginStatus.textContent = '';

        if (!emailInput.value.trim() || !passwordInput.value) {
            loginStatus.textContent = 'Please enter your email and password.';
            return;
        }

        try {
            const users = await loadUsers();
            const user = users.find((account) => account.email.toLowerCase() === emailInput.value.trim().toLowerCase() && account.password === passwordInput.value);

            if (!user) {
                loginStatus.textContent = 'Email or password is incorrect.';
                return;
            }

            const userSession = JSON.stringify({ name: user.name, email: user.email });
            if (rememberMe.checked) {
                localStorage.setItem('edunovaUser', user.name);
                localStorage.setItem('edunovaCurrentUser', userSession);
            } else {
                sessionStorage.setItem('edunovaCurrentUser', userSession);
            }
            sessionStorage.setItem('edunovaLoggedIn', 'true');
            loginStatus.classList.add('success');
            loginStatus.textContent = 'Welcome back, ' + user.name + '! Login successful.';
            const redirectPage = new URLSearchParams(window.location.search).get('redirect');
            const redirectPath = redirectPage ? redirectPage.split('?')[0].toLowerCase() : '';
            const destination = redirectPage && protectedPages.has(redirectPath) ? redirectPage : 'index.html';
            window.setTimeout(() => window.location.replace(destination), 700);
        } catch (error) {
            loginStatus.textContent = 'Login failed. Please check your email and password.';
        }
    });

    document.querySelector('#forgot-password').addEventListener('click', (event) => {
        event.preventDefault();
        loginStatus.textContent = 'Password recovery will be available soon.';
    });
}

