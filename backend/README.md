# Vanderbilt Dining Web Scraper

A Python-based web scraper that automatically extracts menu data from the live Vanderbilt NetNutrition dining website for Rand Dining Hall.

## Features

- **Live Data Scraping**: Scrapes real-time menu data from the NetNutrition website
- **Dynamic Discovery**: Automatically discovers available dates, meals, and food categories
- **Structured Output**: Saves data in a clean, nested JSON format
- **Session Management**: Handles cookies and session state properly
- **Error Handling**: Robust error handling with informative messages

## Requirements

- Python 3.7 or higher
- Internet connection to access the NetNutrition website

## Installation

1. Clone or download this repository
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

Run the scraper to get the current week's menu data:

```bash
python vandy_dining_scraper.py
```

The script will:
1. Establish a session with the NetNutrition website
2. Discover available dates and meals for Rand Dining Hall
3. Extract all food categories and menu items
4. Save the data to `rand_menu.json`

### Output Format

The scraper generates a JSON file with the following structure:

```json
{
  "Rand Dining Hall": {
    "Tuesday, July 15, 2025": {
      "Breakfast": {
        "Bakery": [
          "Blueberry Bagel",
          "Chocolate Muffin",
          "Plain Bagel"
        ],
        "Salad Bar Fruit": [
          "Blueberries",
          "Diced Cantaloupe",
          "Diced Pineapple"
        ]
      }
    }
  }
}
```

## Project Structure

- `vandy_dining_scraper.py` - Main scraper script
- `requirements.txt` - Python dependencies
- `README.md` - This file
- `vandy_dining_live_scraper_spec.md` - Detailed project specification
- `rand_menu.json` - Output file (generated after running)

## How It Works

The scraper follows this workflow:

1. **Session Establishment**: Starts a session to capture cookies
2. **Unit Selection**: POSTs to select Rand Dining Hall (unitOid = 1)
3. **Date Discovery**: Extracts available dates from the response
4. **Meal Discovery**: For each date, discovers available meals
5. **Category Discovery**: For each meal, finds food categories
6. **Item Extraction**: For each category, extracts menu items
7. **Data Assembly**: Builds the final nested JSON structure

## Technical Details

- **Target Website**: Vanderbilt University Dining NetNutrition
- **Base URL**: `https://netnutrition.cbord.com/nn-prod/vucampusdining`
- **Dining Hall**: Rand Dining Center (unitOid = 1)
- **Data Source**: Live POST requests to the NetNutrition API

## Error Handling

The scraper includes comprehensive error handling:
- Network connection issues
- Missing HTML elements
- Invalid responses
- Rate limiting (includes delays between requests)

## Limitations

- Only scrapes Rand Dining Hall (can be extended to other dining halls)
- Scrapes one week of menus at a time
- Requires the website to be accessible and functional

## Future Enhancements

- Support for other dining halls
- Historical data scraping
- Nutritional information extraction
- Allergen information parsing
- Web interface for viewing data

## Legal Notice

This scraper is for educational and personal use only. Please respect the website's terms of service and robots.txt file. The scraper includes reasonable delays between requests to avoid overwhelming the server.

## Troubleshooting

### Common Issues

1. **No menu data found**: Check if the website is accessible and Rand Dining Hall has published menus
2. **Connection errors**: Verify internet connection and website availability
3. **Import errors**: Ensure all dependencies are installed with `pip install -r requirements.txt`

### Debug Mode

To see more detailed output, you can modify the script to add more print statements or use Python's logging module.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the scraper.

## License

This project is provided as-is for educational purposes. 