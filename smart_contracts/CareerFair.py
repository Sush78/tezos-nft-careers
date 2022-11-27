import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")

class NFT(FA2.FA2):
    pass

class CareerFair(sp.Contract):
    def __init__(self, token, metadata, admin):
        self.init(
            token = token,
            metadata = metadata,
            admin = admin,
            data = sp.big_map(tkey=sp.TNat, tvalue=sp.TRecord(holder=sp.TAddress, author = sp.TAddress, amount=sp.TNat, token_id=sp.TNat, collectable=sp.TBool)),
            # keeps track of what talent has applied for one company
            applyMap = sp.map(tkey = sp.TNat, tvalue = sp.TList(t=sp.TNat)),
            # keeps track of what company a talent has applied to
            compMap = sp.map(tkey = sp.TNat, tvalue = sp.TList(t=sp.TNat)),
            # keeps track of the talents rating by companies
            ratingMap = sp.map(tkey = sp.TNat, tvalue = sp.TList(t=sp.TNat)),
            token_id = 0,
        )

    @sp.entry_point
    def rateTalent(self, params):
        sp.set_type(params.talentId, sp.TNat)
        sp.set_type(params.rating, sp.TNat)
        talentId = params.talentId
        rating = params.rating

        # check talentId is valid
        sp.verify(talentId > 0, "Invalid Talent Id")

        sp.if self.data.ratingMap.contains(talentId) == False:
            self.data.ratingMap[talentId] = []
        self.data.ratingMap[talentId].push(rating)

    @sp.entry_point
    def apply(self, params):
        sp.set_type(params.tokenId, sp.TNat)
        sp.set_type(params.companyId, sp.TNat)
        talentId = params.tokenId 
        companyId = params.companyId
        # assertions
        sp.verify(talentId > 0, "Invalid talent Id")
        sp.verify(params.companyId > 0, "Invalid company Id")
        sp.verify(talentId != companyId, "Talent Id can not be the same as company Id")
        
        # Push company Id to map
        sp.if self.data.applyMap.contains(companyId) ==  False:
            self.data.applyMap[companyId] = []
        self.data.applyMap[companyId].push(talentId)

        # Push talent Id to map
        sp.if self.data.compMap.contains(talentId) ==  False:
            self.data.compMap[talentId] = []
        self.data.compMap[talentId].push(companyId)
        
    @sp.entry_point
    def mint(self, params):
        sp.verify((params.amount > 0))
        c = sp.contract(
            sp.TRecord(
            address=sp.TAddress,
            amount=sp.TNat,
            token_id=sp.TNat,
            metadata=sp.TMap(sp.TString, sp.TBytes)
            ), 
            self.data.token, 
            entry_point = "mint").open_some()
            
        sp.transfer(
            sp.record(
            address = sp.self_address,
            amount = 1,
            token_id = self.data.token_id,
            metadata={ '' : params.metadata }
            ), 
            sp.mutez(0), 
            c)
        
        self.data.data[self.data.token_id] = sp.record(holder=sp.self_address, author = sp.sender, amount = params.amount, token_id=self.data.token_id, collectable=True)
        self.data.token_id += 1
    
    def fa2_transfer(self, fa2, from_, to_, token_id, amount):
        c = sp.contract(sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(amount=sp.TNat, to_=sp.TAddress, token_id=sp.TNat).layout(("to_", ("token_id", "amount")))))), fa2, entry_point='transfer').open_some()
        sp.transfer(sp.list([sp.record(from_=from_, txs=sp.list([sp.record(amount=amount, to_=to_, token_id=token_id)]))]), sp.mutez(0), c)

    @sp.entry_point
    def collect(self, params):
        sp.verify(((sp.amount == sp.utils.nat_to_mutez(self.data.data[params.token_id].amount)) & (self.data.data[params.token_id].amount != 0) & (self.data.data[params.token_id].collectable == True) & (self.data.data[params.token_id].author != sp.sender)))
        self.data.data[params.token_id].collectable = False
        self.data.data[params.token_id].holder = sp.sender

        #sending rewards
        sp.send(self.data.data[params.token_id].author, sp.split_tokens(sp.amount, 97, 100))
        
        self.fa2_transfer(self.data.token, sp.self_address, sp.sender, params.token_id, 1)
    
    @sp.entry_point
    def update_admin(self, params):
        sp.verify(sp.sender == self.data.admin)
        self.data.admin = params
    
    @sp.entry_point
    def collect_management_rewards(self, params):
        sp.verify(sp.sender == self.data.admin)

        sp.send(params.address, params.amount)

@sp.add_test(name = "Non Fungible Token")
def test():
    scenario = sp.test_scenario()
    
    admin = sp.test_account("admin")
    mark = sp.test_account("user1")
    elon = sp.test_account("user2")
    
    token_contract = NFT(FA2.FA2_config(non_fungible = True), admin = admin.address, metadata = sp.utils.metadata_of_url("ipfs://QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb"))

    scenario += token_contract

    scenario.h1("Career Fair")
    careerFair = CareerFair(token_contract.address, sp.utils.metadata_of_url("ipfs://QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb"), admin.address)
    scenario += careerFair

    scenario.h1("Apply function")
    talentId = 1
    companyId = 5
    careerFair.apply(tokenId=talentId, companyId=companyId)
   
    scenario.h1("Rating function")
    careerFair.rateTalent(talentId=1, rating=4)
    careerFair.rateTalent(talentId=1, rating=5)
    careerFair.rateTalent(talentId=1, rating=7)
    careerFair.rateTalent(talentId=5, rating=3)

    scenario.h1("Minting function")    
    scenario += token_contract.set_administrator(careerFair.address).run(sender = admin)
    careerFair.mint(sp.record(amount = 100000000, metadata = sp.pack("ipfs://bafyreibwl5hhjgrat5l7cmjlv6ppwghm6ijygpz2xor2r6incfcxnl7y3e/metadata.json"))).run(sender = admin)
    careerFair.mint(sp.record(amount = 100000000, metadata = sp.pack("ipfs://bafyreibwl5hhjgrat5l7cmjlv6ppwghm6ijygpz2xor2r6incfcxnl7y3e/metadata.json"))).run(sender = mark)