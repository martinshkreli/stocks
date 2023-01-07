import blessed from 'blessed';
import { format } from 'date-fns';
import { getTickerData } from './quotes.js';
import tickers from './tickers';

// Check: https://www.npmjs.com/package/blessed-contrib

// const randChars = ['*', '%', '$', '&', '@', '!', '^', '~', '+', '?', '/', '|', '<', '>'];

// create the screen object
const screen = blessed.screen({
  smartCSR: true,
});

// create a box for the ticker list
const tickerBox = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  height: '60%',
  content: 'Quotes:',
  tags: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0',
    },
  },
});

// add the ticker box to the screen
screen.append(tickerBox);

// Create a table for the stock quotes
const quoteTable = blessed.table({
  parent: tickerBox,
  top: 0,
  left: 0,
  right: 0,
  data: undefined,
  tags: true,
  border: {
    type: 'line',
  },
  keys: true,
  mouse: true,
  scrollable: true,
  scrollbar: {
    style: {
      bg: 'yellow',
    },
  },
  noCellBorders: true,
  focusable: true,
  keyable: true,
  label: 'Quotes',
  shadow: true,
  shrink: true,
  pad: 0,
  style: {
    header: {
      fg: 'white',
      bg: 'blue',
      bold: true,
    },
    cell: {
      fg: 'white',
      bg: 'black',
      selected: {
        bg: 'green',
      },
    },
  },
});

// create a box for the logs
const logBox = blessed.box({
  top: '50%',
  left: 0,
  width: '100%',
  height: '30%',
  content: 'Log:',
  tags: true,
  border: {
    type: 'line',
  },
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    style: {
      bg: 'yellow',
    },
  },
  mouse: true,
  keys: true,
  focusable: true,
  keyable: true,
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0',
    },
  },
});

// function to add a log message to the log box
const addLogMessage = (message: string) => {
  logBox.pushLine(`${format(new Date(), 'MM/dd/yyyy HH:mm:ss')}: {yellow-fg}${message}{/yellow-fg}`);
  logBox.setScrollPerc(100);
  screen.render();
};

// add the log box to the screen
screen.append(logBox);

// create a box for the keyboard shortcuts
const shortcutBox = blessed.box({
  top: '80%',
  left: 'left',
  width: '100%',
  height: '20%',
  content: 'Keyboard Shortcuts:\n' + 'q - Quit\n' + 'r - Refresh ticker data',
  tags: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'dark',
    bg: 'black',
    border: {
      fg: '#f0f0f0',
    },
  },
});

// add the shortcut box to the screen
screen.append(shortcutBox);

// function to update the ticker box with the latest ticker data
const updateTickerBox = () => {
  // make an API call to get the latest ticker data
  getTickerData(tickers).then((data) => {
    // Update the table with the new quotes
    const tableData = tickers.map((symbol): string[] => {
      const tickerData = data[symbol];
      return [symbol, String(tickerData.price), tickerData.change, String(tickerData.volume)];
    });
    const headers = ['Symbol', 'Price', 'Change', '% Change'];
    quoteTable.setData([headers, ...tableData]);
    addLogMessage('Ticker data refreshed');
    screen.render();

    // format the data for display
    /*
    const tickerList = tickers.map((ticker) => {
      const tickerData = data[ticker];
      // const randomChar = randChars[Math.floor(Math.random() * randChars.length)];

      let arrow = '';
      if (tickerData.change.includes('+')) {
        arrow = '{green-fg}↑{/green-fg}';
      } else if (tickerData.change.includes('-')) {
        arrow = '{red-fg}↓{/red-fg}';
      }

      return `${ticker.padEnd(5)} ${tickerData.price.toFixed(2).padStart(6)} ${arrow}`;
    });
    // divide the ticker list into columns
    // const columnWidth = Math.max(...tickerList.map((s) => s.length)) + 1;
    const numColumns = 4; // Math.floor(parseInt(String(tickerBox.width)) / columnWidth);
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns[i] = tickerList.filter((_, j) => j % numColumns === i);
    }
    // update the ticker box content with the latest data
    tickerBox.setContent(columns.map((column) => column.join('  ')).join('\n'));
    // render the screen to show the updated data
    screen.render();
    */
  });
};

// update the ticker box every 10 seconds
// updateTickerBox();
setInterval(updateTickerBox, 500);

// quit the program when the user hits 'q'
screen.key(['q', 'C-c'], (ch, key) => {
  return process.exit(0);
});

// refresh the ticker data when the user hits 'r'
screen.key('r', (ch, key) => {
  updateTickerBox();
});

// render the screen
screen.render();
