from transformers.pipelines import pipeline

classifier = pipeline("zero-shot-classification", model = "facebook/bart-large-mnli")

def get_topic(text: str):
    # candidate_labels = ["Education", "Technology", "Health", "Politics", "Travel"]
    candidate_labels = [
        # Core News Categories
        "Politics",
        "World Affairs",
        "Local News",
        "Business",
        "Finance",
        "Economics",
        "Public Policy",
        "Law & Justice",
        "Military & Defense",
        
        # Science & Technology
        "Science",
        "Medical Research",
        "Space & Astronomy",
        "Artificial Intelligence",
        "Cybersecurity",
        "Software Development",
        "Hardware & Gadgets",
        "Biotechnology",
        "Climate Science",
        "Sustainability",
        "Environmental Issues",
        
        # Health & Lifestyle
        "Health & Wellness",
        "Mental Health",
        "Nutrition",
        "Fitness",
        "Lifestyle",
        "Personal Development",
        "Parenting",
        "Home & Garden",
        "Relationships",
        
        # Culture & Society
        "Entertainment",
        "Movies & TV",
        "Music",
        "Fashion & Beauty",
        "Food & Cooking",
        "Travel & Tourism",
        "Education",
        "Religion",
        "Philosophy",
        "History",
        "Literature",
        "Language & Linguistics",
        
        # Arts & Creativity
        "Visual Arts",
        "Performing Arts",
        "Digital Art",
        "Design & Architecture",
        "Photography",
        "Gaming",
        "Comics & Graphic Novels",
        
        # Sports & Recreation
        "Sports",
        "Outdoor & Adventure",
        "Esports",
        
        # Tech Trends
        "Technology",
        "Startups",
        "Innovation",
        "Gadgets & Reviews",
        "Data Science",
        "Web3 & Blockchain",
        
        # Real-world Concerns
        "Real Estate",
        "Automotive",
        "Job Market & Careers",
        "Consumer Rights",
        "Ethics",
        "Legal Advice",
        "Disasters & Accidents",
        "Crime & Policing",
        "Social Justice",
        "Climate Change"
    ]

    detection = classifier(text, candidate_labels)

    topic = {key: value for key, value in zip(detection["labels"], detection["scores"])}

    """format of output:
    1. topics list
    2. confidence score of each topic
    """
    return topic