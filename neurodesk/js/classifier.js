// AI Classifier Simulation
const Classifier = {
  // Simple keyword matching simulating a classification model
  keywords: {
    'Billing': ['payment', 'invoice', 'charge', 'refund', 'card', 'billing', 'subscription', 'price', 'money', 'credit'],
    'Bug Report': ['bug', 'error', 'crash', 'broken', 'fail', '500', '404', 'not loading', 'typo'],
    'Account': ['login', 'password', 'account', 'email', 'auth', '2fa', 'security', 'profile', 'reset'],
    'Technical Issue': ['not working', 'down', 'outage', 'api', 'slow', 'integration', 'export', 'system', 'latency'],
    'Feature Request': ['feature', 'request', 'add', 'improve', 'idea', 'wish', 'support for', 'integration with']
  },

  urgencyKeywords: {
    'Critical': ['urgent', 'critical', 'not working', 'down', 'blocked', 'crashed', 'production', 'immediately', 'p0'],
    'High': ['important', 'asap', 'broken', 'failed', 'error', 'stuck', 'issue'],
    'Medium': ['please', 'help', 'question', 'wondering', 'how to']
  },

  sentimentKeywords: {
    'Angry': ['unacceptable', 'ridiculous', 'terrible', 'worst', 'angry', 'frustrated', 'failing', 'useless', 'cancel', 'bullshit', 'sucks'],
    'Happy': ['love', 'great', 'awesome', 'thanks', 'thank you', 'amazing', 'perfect', 'appreciate', 'good job'],
  },

  analyze(text) {
    const lowerText = text.toLowerCase();
    
    // Default fallback
    let category = 'General Query';
    let priority = 'Low';
    let sentiment = 'Neutral';
    let maxCategoryScore = 0;
    let maxPriorityScore = 0;
    
    const matchedKeywords = [];
    const matchedUrgencyWords = [];

    // Check Categories
    for (const [cat, words] of Object.entries(this.keywords)) {
      let score = 0;
      words.forEach(word => {
        if (lowerText.includes(word)) {
          score++;
          matchedKeywords.push(word);
        }
      });
      if (score > maxCategoryScore) {
        maxCategoryScore = score;
        category = cat;
      }
    }

    // Check Priority
    for (const [prio, words] of Object.entries(this.urgencyKeywords)) {
      let score = 0;
      words.forEach(word => {
        if (lowerText.includes(word)) {
          score++;
          matchedUrgencyWords.push(word);
        }
      });
      if (score > maxPriorityScore) {
        maxPriorityScore = score;
        priority = prio;
      }
    }

    // Check Sentiment
    let angryScore = 0;
    let happyScore = 0;
    this.sentimentKeywords['Angry'].forEach(w => { if(lowerText.includes(w)) angryScore++; });
    this.sentimentKeywords['Happy'].forEach(w => { if(lowerText.includes(w)) happyScore++; });
    
    if (angryScore > happyScore && angryScore > 0) sentiment = 'Angry';
    else if (happyScore > angryScore && happyScore > 0) sentiment = 'Happy';

    // Special cases
    if (category === 'Bug Report' && priority === 'Low') priority = 'Medium';
    if (sentiment === 'Angry' && priority === 'Low') priority = 'Medium';
    if (sentiment === 'Angry' && priority === 'Medium') priority = 'High';

    // Calculate simulated confidence
    const baseConf = 65;
    const catBonus = Math.min(25, maxCategoryScore * 8);
    const prioBonus = Math.min(9, maxPriorityScore * 3);
    const confidence = baseConf + catBonus + prioBonus;

    // Generate tags
    const allWords = text.replace(/[.,!?]/g, '').split(' ');
    const tags = matchedKeywords.concat(matchedUrgencyWords).slice(0, 4);
    if (tags.length === 0) tags.push('general');

    return {
      category,
      priority,
      sentiment,
      confidence: Math.min(99, confidence),
      keywords: [...new Set(matchedKeywords)],
      tags: [...new Set(tags)],
      urgencyWords: [...new Set(matchedUrgencyWords)],
      explanation: this.generateExplanation(category, priority, matchedKeywords, matchedUrgencyWords),
      suggestedReply: this.generateSuggestedReply(category, sentiment)
    };
  },

  generateExplanation(category, priority, keywords, urgencyWords) {
    let explanation = `The model classified this as <strong>${category}</strong> `;
    
    if (keywords.length > 0) {
      explanation += `due to strong semantic matches with keywords like ${keywords.slice(0,3).map(k => `<span class="keyword-highlight">${k}</span>`).join(', ')}. `;
    } else {
      explanation += `based on general text embeddings. `;
    }

    explanation += `Priority was assigned as <strong>${priority}</strong> `;
    if (urgencyWords.length > 0) {
      explanation += `because urgency indicators such as ${urgencyWords.map(k => `<span class="keyword-highlight">${k}</span>`).join(', ')} were detected.`;
    } else {
      explanation += `based on standard baseline for this category.`;
    }

    return explanation;
  },

  generateSuggestedReply(category, sentiment) {
    const greeting = sentiment === 'Angry' ? 
      "Hi there, I sincerely apologize for the frustration this has caused." : 
      "Hi there, thanks for reaching out to us.";
      
    const bodies = {
      'Billing': "I've reviewed your account and can confirm I see the charge in question. I'm escalating this to our finance team to issue the necessary refund immediately.",
      'Technical Issue': "Our engineering team has been notified of this behavior. We are currently investigating the root cause and will update you as soon as we have a fix.",
      'Bug Report': "Thank you for bringing this to our attention. I was able to replicate the issue on my end, and I've logged a high-priority ticket with our developers.",
      'Account': "For security purposes, I've triggered a password reset link to your registered email address. Please follow the instructions there to regain access.",
      'Feature Request': "That's a fantastic idea! I've added your vote to our internal feature tracker. Our product team reviews these weekly.",
      'General Query': "I'd be happy to help with that. You can find detailed instructions in our documentation here: [Link]. Let me know if you need further clarification."
    };

    const closing = "Best regards,\nYour Support Team";

    return `${greeting}\n\n${bodies[category]}\n\n${closing}`;
  }
};
