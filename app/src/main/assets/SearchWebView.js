﻿// We're using a global variable to store the number of occurrences

var console = "\n";
var results = "";

var neighSize = 40

// helper function, recursively searches in elements and their child nodes
function MyApp_HighlightAllOccurencesOfStringForElement(element, keyword) {
	if (element) {
		if (element.nodeType == 3) { // Text node
			while (true) {

				var value = element.nodeValue; // Search for keyword in text node
				//

				var idx = value.toLowerCase().indexOf(keyword);

				////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				if (idx < 0) {
					break;
				}

				var symbols = "!$%^&*()_+|~-=`{}[]:\";'<>?,./،:»«،؛";

				//////////////////////////////////////////////////

				var nextChar = value.substr(idx + keyword.length, 1);
				var prevChar = value.substring(idx - 1, idx);

				if((nextChar == " " || nextChar == "\n" || nextChar == "\t" || symbols.indexOf(nextChar) != -1)
						&& (prevChar == " " || prevChar == "\n" || prevChar == "\t" || symbols.indexOf(prevChar) != -1))
					{

					var span = document.createElement("span");
					span.className = "highlight";
					span.style.backgroundColor = "yellow";
					span.style.color = "black";

					var text = document.createTextNode(
							value.substr(idx, keyword.length));

					span.appendChild(text);

					var rightText = document.createTextNode(
							value.substr(idx + keyword.length));
					element.deleteData(idx, value.length - idx);

					var next = element.nextSibling;

					element.parentNode.insertBefore(rightText, next);
					element.parentNode.insertBefore(span, rightText);

					var leftNeighText = element.nodeValue.substr(
							element.length - neighSize, neighSize);
					var rightNeighText = rightText.nodeValue.substr(0,
							neighSize);

					element = rightText;

					leftNeighText = leftNeighText.replace("\n", " ");
					if (leftNeighText.charAt(leftNeighText.length) == " ") {
						leftNeighText = leftNeighText.trim();
						leftNeighText = leftNeighText + " ";
					}

					rightNeighText = rightNeighText.replace("\n", " ");
					if (rightNeighText.charAt(0) == " ") {
						rightNeighText = rightNeighText.trim();
						rightNeighText = " " + rightNeighText;
					}
					leftNeighText = leftNeighText.substring(
							leftNeighText.indexOf(" "), leftNeighText.length);
					rightNeighText = rightNeighText.substring(0,
							rightNeighText.lastIndexOf(" "));


					var elementPos = getPos(span);


					results += getPos(span).y+ "|"
							+ (leftNeighText + text.nodeValue + rightNeighText)
							+ ";";

					idx++;

					results;
				} else {
					break;
				}

			}

		} else if (element.nodeType == 1) { // Element node
			if (element.style.display != "none"
					&& element.nodeName.toLowerCase() != 'select') {
				for (var i = element.childNodes.length - 1; i >= 0; i--) {
					MyApp_HighlightAllOccurencesOfStringForElement(
							element.childNodes[i], keyword);
				}
			}
		}
	}
}

function getPos_(el) {
	// yay readability
for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly +=
		el.offsetTop, el = el.offsetParent)

	return {x: lx,y: ly};
}
function getPos(obj)
{
var rect = obj.getBoundingClientRect();
var scrollTop =
		document.documentElement.scrollTop ?
				document.documentElement.scrollTop : document.body.scrollTop;
var scrollLeft =
		document.documentElement.scrollLeft ?
				document.documentElement.scrollLeft : document.body.scrollLeft;

return {x: rect.left + scrollLeft, y: rect.top + scrollTop};
}

// the main entry point to start the search
function MyApp_HighlightAllOccurencesOfString(keyword) {
// alert(keyword);

MyApp_RemoveAllHighlights();
MyApp_HighlightAllOccurencesOfStringForElement(document.body,
		keyword.toLowerCase());
}

// helper function, recursively removes the highlights in elements and their childs
function MyApp_RemoveAllHighlightsForElement(element) {
if (element) {
	if (element.nodeType == 1) {
		if (element.getAttribute("class") == "highlight") {
			var text = element.removeChild(element.firstChild);
			element.parentNode.insertBefore(text, element);
			element.parentNode.removeChild(element);
			return true;
		} else {
			var normalize = false;
			for (var i = element.childNodes.length - 1; i >= 0; i--) {
				if (MyApp_RemoveAllHighlightsForElement(
						element.childNodes[i])) {
					normalize = true;
				}
			}
			if (normalize) {
				element.normalize();
			}
		}
	}
}
return false;
}

// the main entry point to remove the highlights
function MyApp_RemoveAllHighlights() {
MyApp_RemoveAllHighlightsForElement(document.body);
}