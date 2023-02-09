const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    // Act
    const trivialKey = deterministicPartitionKey();
    
    // Assert
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given undefined partition key", () => {
    // Act
    const trivialKey = deterministicPartitionKey({ partitionKey: undefined });

    // Assert
    expect(trivialKey).toBe("0");
  });

  it("Returns the json when given a partition key", () => {
    // Arrange
    const input = { partitionKey: { value: "foo"} };
    const expectedResult = JSON.stringify(input.partitionKey);
    
    // Act
    const trivialKey = deterministicPartitionKey(input);

    // Assert
    expect(trivialKey).toBe(expectedResult);
  });

  it("Returns the hash key when given an input in a different format", () => {
    // Arrange
    const input = { value: "foo"};
    const data = JSON.stringify(input);
    const expectedResult = crypto.createHash("sha3-512").update(data).digest("hex");
    
    // Act
    const trivialKey = deterministicPartitionKey(input);

    // Assert
    expect(trivialKey).toBe(expectedResult);
  });

  it("Returns the hash key when given an partition key larger than the max length", () => {
    // Arrange
    const event = { value: "foooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"};
    const data = JSON.stringify(event);
    const expectedResult = crypto.createHash("sha3-512").update(data ).digest("hex")
    
    // Act
    const trivialKey = deterministicPartitionKey(event);

    // Assert
    expect(trivialKey).toBe(expectedResult);
  });
});

/* ##Notes

I've covered the scenarios that I thought of. I've also added comments separating which actions each unit test is performing to improve readability. "Arrange" are the code snippet preparing all the necessary conditions for the test case. "Act" is the execution of the function for that test case. "Assert", as the name implies, asserts whether or not the test case passes or fails. */
