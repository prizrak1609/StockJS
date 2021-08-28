/**
 * Obfuscate a plaintext string with a simple rotation algorithm similar to
 * the rot13 cipher.
 * @return {string}     obfuscated string
 */
 String.prototype.obfuscate = function () { 
  let bytes = []; 
  for (var i = 0; i < this.length; i++) { 
    let charCode = this.charCodeAt(i); 
    // pad the string to 3 digits 
    let char = String("000" + charCode).slice(-3);
    bytes.push(char); 
  }
  return bytes.join('');
}
  
  /**
   * De-obfuscate an obfuscated string with the method above.
   * @return {string}     plaintext string
   */
  String.prototype.deobfuscate = function () {
    var string = "";
    var chunks = this.match(/.{1,3}/g);
    for (var i = 0; i < chunks.length; i++) {
      string += String.fromCharCode(parseInt(chunks[i], 10)); 
    } 
    return string; 
  }