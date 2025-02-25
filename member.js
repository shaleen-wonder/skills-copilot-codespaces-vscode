function skillsMember(){

    var member = {
        name: "John",
        age: 25,
        skills: ["HTML", "CSS", "JS"],
        greet: function(){
            console.log("Hello, I'm " + this.name);
        }
    };

    return member;
    
}