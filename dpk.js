const crypto = require("crypto");

exports.deterministicPartitionKey = (event: any): string => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  
  let candidate = getPartitionKeyFromInput(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = CreateHashFromData(candidate);
  }
  
  return candidate;

  function getPartitionKeyFromInput(event: any): string {
    if(!event) {
      return TRIVIAL_PARTITION_KEY;
    }
    
    if (!event.partitionKey) {
      const data = JSON.stringify(event);
      return CreateHashFromData(data);
    }

    if (typeof event.partitionKey !== "string") {
      return JSON.stringify(event.partitionKey);
    }

    return event.partitionKey;
  }

  function CreateHashFromData(data: any): string {
    return crypto.createHash("sha3-512").update(data).digest("hex")
  }
};


/* ##Notes

I've created two nested functions: a function with a repeated code that creates a hash of the input for the function, and another 
that formats the input. This serves to both improve readability of the component overall and is a form of documenting what the code does, 
without the use of comment snippets. In Angular or React, this would be a component function that could be individually unit tested for more 
assertive tests. I have also added return types to arguments and functions, so the code can explain what it expects and what to expect from it. 
While I generally prefer utilizing positive conditions, to simplify nested ifs I've opted to go the opposite route and validate all negative 
conditions, since each condition depends on the previous one to be fulfilled. 

"But Valderi, we asked you to refactor it, there's MORE lines of code now!" True. While the main function has been reduced to a half a dozen lines, the overall
code length has increased. In my time as a Sr. Developer and Team lead, I've come to realize that "sleek" code does not always make for "clean and readable"
code. It often times takes much longer to carefully read and understand what a sleek code is doing than one that's a bit more verbose, but you can understand
what it is doing by just skimming it. */
