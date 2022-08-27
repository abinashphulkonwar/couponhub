const createUserListner = jest.fn().mockImplementation((cal) => {
  console.log("websocket mock");
  cal();
});

export { createUserListner };
